/*
|--------------------------------------------------------------------------
| Predeclare exports (to mitigate circular dependencies).
|--------------------------------------------------------------------------
*/

module.exports = {
  getWalletContentsForGame,
}



const config = require('../config/config');
const errorService = require('./error.service');
const assetService = require('./asset.service');
//const webhookService = require('./webhook.service');
//const web3Service = require('./web3.service');
//const userService = require('./user.service');
//const ERC20 = require("../../contracts/ERC20.json");
const { ethers } = require('ethers');
const { getInternalTokenIdFromCustomTokenId } = require('../util/customToken');
const { Network, Alchemy } = require('alchemy-sdk');
//const { webhook: slackWebhook } = require('../notifications/slack');
//const Bugsnag = require('@bugsnag/js');
//const Moralis = require("moralis");
//const Web3 = require('web3');
//const gmgAsset = require("../../contracts/ERC721_GMG_Asset.json")

//const networkRpcURL = config.web3.networkRpcUrl;
//const provider = new ethers.providers.JsonRpcProvider(networkRpcURL);


/**
 * Get wallet balances from the Alchemy service.
 * See: https://docs.alchemy.com/reference/sdk-getnfts
 */
async function getWalletContentsForGame(gameId, address) {
  try {
    let startTime = performance.now();

    let settings = {
      apiKey: config.web3.alchemy.apiKey,
    };

    switch (config.web3.chain) {
      case 'polygon:mumbai':
      case 'polygon:testnet':
        settings.network = Network.MATIC_MUMBAI;
        break;
      case 'polygon:mainnet':
        settings.network = Network.MATIC_MAINNET;
        break;
    }

    const alchemy = new Alchemy(settings);
    let promises = [];


    ////////////////////////////////////////////////////////////
    // ERC20 - can be turned on/off in ENV, and we may not even
    // have any tokens in the db to get info for - be prepared

/*     if (config.walletContentErc20) {
      const erc20Addresses = await assetService.getErc20Addresses();
      if (erc20Addresses === false) {
        console.log('...ERROR GETTING ERC20 addresses');
        // TODO: other notifications??
        // but we don't crap out cos we may be able to get other assets at least
        promises.push([]);
      } else if (erc20Addresses.length === 0) {
        console.log('...NO ERC20 addresses to check');
        promises.push([]);
      } else {
        console.log('ERC20 Addresses', erc20Addresses);
        promises.push(alchemy.core.getTokenBalances(address, erc20Addresses));
      }
    } else {
      promises.push([]);
    } */


    ////////////////////////////////////////////////////////////
    // Smart Contract tokens

    let idx = 0;
    let contractAddresses = await assetService.getNftAddressesForGame(gameId);
    if (contractAddresses === false) {
      // TODO: don't crap out??? other notifications?
      // return false;
      console.log('ERROR GETTING CONTRACT ADDRESSES');
      contractAddresses = [];
    }
    console.log('ALCHEMY all contract addresses', contractAddresses);

    while (idx < contractAddresses.length) {
      const options = {
        //contractAddresses: contractAddresses.slice(idx, idx+config.web3.alchemy.maxContractsPerCall),
        contractAddresses: contractAddresses,
        omitMetadata: true,
      };

      console.log(`ALCHEMY: start: ${idx} -> ${config.web3.alchemy.maxContractsPerCall}`, options);
      promises.push(alchemy.nft.getNftsForOwner(address, options));

      idx += config.web3.alchemy.maxContractsPerCall;
    }

    let erc20 = [];
    let nfts = [];
    const responses = await Promise.all(promises);

    responses.forEach((resp, index) => {
      console.log('resp', resp);
      if (resp) {
/*         if (index === 0) {
          erc20 = erc20.concat(resp?.tokenBalances || []);
        } else { */
        nfts = nfts.concat(resp?.ownedNfts || []);
        //}
      }
    });

    const alchemyTiming = performance.now() - startTime;
    console.log(`ALCHEMY TIMING ${alchemyTiming} ms`);

    console.log("NFTs are: ", nfts);

    startTime = performance.now();

    // Get all ERC721 tokens
    let erc721Assets = await getErc721ListFromAlchemy(gameId, nfts, address);
    if (erc721Assets === false) {
      // TODO: don't crap out??? other notifications?
      // return false;
      erc721Assets = [];
    }

    // Get all ERC1155 tokens
/*     let erc1155Assets = await getErc1155ListFromAlchemy(gameId, nfts, address);
    if (erc1155Assets === false) {
      // TODO: don't crap out??? other notifications?
      // return false;
      erc1155Assets = [];
    } */

    // Get all ERC20 tokens
/*     let erc20Assets = await getErc20ListFromAlchemy(erc20, address);
    if (erc20Assets === false) {
      // TODO: don't crap out??? other notifications?
      // return false;
      erc20Assets = [];
    } */

    //const allAssets = erc721Assets.concat(erc1155Assets).concat(erc20Assets);

    const procTiming = performance.now() - startTime;
    console.log(`PROC TIMING ${procTiming} ms`);

    return {
      //data: erc721Assets.concat(erc1155Assets),
      //data: erc721Assets,
      data: nfts,
      //currencies: erc20Assets,
      timing: { alchemyTiming, settings, nfts },
    };
  } catch (e) {
    errorService.stashInternalErrorFromException(e, 'Svc:Alchemy:getWalletContentsForGame: ');

/*     Bugsnag.notify(e, event => {
      event.context = 'Alchemy:: Get Wallet Contents';
      event.addMetadata('payload', {gameId, address});
    });

    slackWebhook.send({
      text: 'ALCHEMY ERROR - check bugsnag'
    }); */

    return false;
  }
}


/**
 * Transform ERC721 results from alchemy into the format the games need.
 */
async function getErc721ListFromAlchemy(gameId, nfts, wallet) {
  try {
    let erc721GameAssets = [];
    let output721 = [];

    if (!nfts?.length) {
      return output721;
    }

    for (const erc721Token of nfts) {
      const contractAddress = erc721Token.contract.address;
      const erc721Asset = await assetService.getNftAssetByAddress(contractAddress);

      if (!erc721Asset) {
        // TODO???
        console.log(`asset not found for address ${contractAddress}`);
        continue;
      }
      if (erc721Asset.tokenType.toLowerCase() !== 'erc721') {
        // console.log(`asset not ERC721 ${contractAddress}`);
        continue;
      }

      console.log(`ALCHEMY: ERC721 found: ${contractAddress} - ${erc721Token.tokenId}`);

      // the *proper* way to get internal token id is to call the getter on the smart contract
      // BUT this takes time - something like 100ms to connect to contract and make call
      // this is unacceptable as users get more and more NFTs - so we do the hacky thing
      // of usingin knowledge of the custom token bitfield layout and do the extraction
      // using bitfield operators - much much faster

      /****
      const startTime = performance.now();
      const GMGAssetContract = new ethers.Contract(contractAddress, gmgAsset.abi, provider);
      const internalTokenId2 = await GMGAssetContract.getInternalTokenIdFromCustomTokenId(erc721Token.tokenId);
      const procTiming = performance.now() - startTime;

      console.log(`...INTERNAL TOKEN ID: ${internalTokenId.toNumber()} --- ${internalTokenId2.toNumber()} - ${procTiming} ms`);
      ****/

      const internalTokenId = getInternalTokenIdFromCustomTokenId(erc721Token.tokenId);
      const bn = ethers.BigNumber.from(erc721Token.tokenId);

      console.log(`...INTERNAL TOKEN ID: ${internalTokenId.toNumber()}`);

      for (const gameAsset of erc721Asset.dataValues.gameData) {
        if (gameAsset.gameId === gameId && internalTokenId == gameAsset.tokenId) {
          erc721GameAssets.push({
            assetId: gameAsset.assetId,
            tmItemId: gameAsset.tmItemId || null,
            internalTokenId: gameAsset.tokenId,
            token: {
              type: 'erc721',
              wallet,
              analyticId: `${contractAddress}:${bn.toHexString()}`,
              smartContractId: contractAddress,
              internalTokenId: gameAsset.tokenId,
              // NB force customTokenId to a string for consistency
              customTokenId: String(erc721Token.tokenId),
            }
          });
        }
      }

      output721 = Object.values(erc721GameAssets.reduce((acc, curr) => {
        const key = `${curr.assetId}-${curr.internalTokenId}`;
        if (acc[key]) {
          acc[key].tokens.push(curr.token);
        } else {
          acc[key] = {
            type: 'asset',
            assetId: curr.assetId,
            tmItemId: curr.tmItemId || null,
            internalTokenId: curr.internalTokenId,
            tokens: [curr.token]
          };
        }
        return acc;
      }, {}));
    }

    return output721;
  } catch (e) {
    errorService.stashInternalErrorFromException(e, 'Svc:Wallet:getErc721ListFromAlchemy: ');

/*     Bugsnag.notify(e, event => {
      event.context = 'Alchemy:: Get 721';
      event.addMetadata('payload', {gameId, results});
    });

    slackWebhook.send({
      text: 'ALCHEMY 721 ERROR - check bugsnag'
    }); */

    return false;
  }
}


/**
 * Transform ERC1155 results from Alchemy into the format the games need.
 */
async function getErc1155ListFromAlchemy(gameId, nfts, wallet) {
  try {
    let erc1155GameAssets = [];
    let output1155 = [];

    if (!nfts?.length) {
      return output1155;
    }

    for (const erc1155Token of nfts) {
      const contractAddress = erc1155Token.contract.address;
      const erc1155Asset = await assetService.getNftAssetByAddress(contractAddress);

      if (!erc1155Asset) {
        // TODO???
        console.log(`asset not found for address ${contractAddress}`);
        continue;
      }
      if (erc1155Asset.tokenType.toLowerCase() !== 'erc1155') {
        // console.log(`asset not ERC1155 ${contractAddress}`);
        continue;
      }

      let bn2SmartContractAddress = ethers.BigNumber.from(contractAddress);

      for (const gameAsset of erc1155Asset.dataValues.gameData) {
        if (gameAsset.gameId === gameId && parseInt(erc1155Token.tokenId) === gameAsset.tokenId) {
          erc1155GameAssets.push({
            assetId: gameAsset.assetId,
            tmItemId: gameAsset.tmItemId || null,
            internalTokenId: gameAsset.tokenId,
            token: {
              type: 'erc1155',
              wallet,
              analyticId: `${bn2SmartContractAddress.toHexString()}:${gameAsset.tokenId}`,
              smartContractId: contractAddress,
              internalTokenId: gameAsset.tokenId,
              // NB force customTokenId to a string for consistency
              customTokenId: String(erc1155Token.tokenId),
              value: erc1155Token.balance,
            }
          });
        }
      }

      output1155 = Object.values(erc1155GameAssets.reduce((acc, curr) => {
        const key = `${curr.assetId}-${curr.internalTokenId}`;
        if (acc[key]) {
          acc[key].tokens.push(curr.token);
        } else {
          acc[key] = {
            type: 'asset',
            assetId: curr.assetId,
            tmItemId: curr.tmItemId || null,
            internalTokenId: curr.internalTokenId,
            tokens: [curr.token]
          };
        }
        return acc;
      }, {}));
    }

    return output1155;
  } catch (e) {
    errorService.stashInternalErrorFromException(e, 'Svc:Wallet:getErc155ListFromAlchemy: ');

/*     Bugsnag.notify(e, event => {
      event.context = 'Alchemy:: Get 1155';
      event.addMetadata('payload', {gameId, results});
    });

    slackWebhook.send({
      text: 'ALCHEMY 1155 ERROR - check bugsnag'
    }); */

    return false;
  }
}

/**
 * Transform ERC20 results from Alchemy into the format the games need.
 */
async function getErc20ListFromAlchemy(erc20s, wallet) {
  // console.log('Svc:Alchemy:getErc20ListFromAlchemy', wallet, erc20s);

  try {
    let output20 = [];

    if (!erc20s?.length) {
      return output20;
    }

    for (const erc20Token of erc20s) {
      const contractAddress = erc20Token.contractAddress;
      const asset = await assetService.getErc20AssetByAddress(contractAddress);

      if (!asset) {
        // TODO???
        console.log(`ERC20 asset not found for address ${contractAddress}`);
        continue;
      }

      output20.push({
        type: "erc20",
        wallet,
        analyticId: `token-${contractAddress}`,
        smartContractId: contractAddress,
        balance: ethers.BigNumber.from(erc20Token.tokenBalance).toString(),
        balanceFmt: web3Service.getTokenBalanceFmt(erc20Token.tokenBalance, asset.decimals === null ? 18 : asset.decimals),
        name: asset.name,
        symbol: asset.symbol,
      });
    }

    return output20;
  } catch (e) {
    errorService.stashInternalErrorFromException(e, 'Svc:Wallet:getErc20ListFromAlchemy: ');

/*     Bugsnag.notify(e, event => {
      event.context = 'Alchemy:: Get ERC20 List';
      event.addMetadata('erc20 list', {erc20s});
    });

    slackWebhook.send({
      text: 'ALCHEMY Get ERC20 ERROR - check bugsnag'
    }); */

    return false;
  }
}
