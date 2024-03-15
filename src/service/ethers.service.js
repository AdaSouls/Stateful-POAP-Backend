/*
|--------------------------------------------------------------------------
| Predeclare exports (to mitigate circular dependencies).
|--------------------------------------------------------------------------
*/

module.exports = {
  getAllAssets,
  getAllAssetsByGame,
  getWalletContentsForGame,
};



const models = require('../model');
const errorService = require('./error.service');
const config = require('../config/config');
const { ethers } = require('ethers');
const BigNumber = require('bignumber.js');
const { getInternalTokenIdFromCustomTokenId } = require('../util/customToken');
const { performance } = require('perf_hooks');

const networkRpcURL = config.web3.networkRpcUrl;
const provider = new ethers.providers.JsonRpcProvider(networkRpcURL);

const erc1155Abi = ['function balanceOf(address, uint256) view returns (uint256)'];
const erc721Abi = ['function balanceOf(address) view returns (uint256)', 'function name() view returns (string)', 'function tokenOfOwnerByIndex(address, uint256) view returns (uint256)'];


/**
 * Get all assets
 *
 * @returns {array}
 */
async function getAllAssets() {
  return await models.Asset.findAll();
}

/**
 * Get all assets by game
 *
 * @returns {array}
 */
async function getAllAssetsByGame(gameId) {
  try {
    var assetList = [];
    const assets = await models.Asset.findAll();
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      var gameDataList = [];
      for (let j = 0; j < asset.gameData.length; j++) {
        const assetData = asset.gameData[j];
        if (assetData.gameId === gameId) {
          gameDataList.push(assetData);
        }
      }

      if (gameDataList.length > 0) {
        assetList.push({
          assetId: asset.title,
          tokenType: asset.assetType,
          address: asset.address,
          gameData: gameDataList
        });
      }
    }
    return assetList;
  } catch (e) {
    return [];
  }
}

/**
 * Get all assets for a given game/wallet.
 *
 * @returns {array}
 */
async function getWalletContentsForGame(gameId, walletAddress, method = 'sync') {
  const assetList = await getAllAssetsByGame(gameId);
  let erc721GameAssets = [];
  let erc1155GameAssets = [];

  const processResults = function () {
    const output721 = Object.values(erc721GameAssets.reduce((acc, curr) => {
      const key = `${curr.assetId}-${curr.internalTokenId}`;
      if (acc[key]) {
        acc[key].tokens.push(curr.token);
      } else {
        acc[key] = {
          assetId: curr.assetId,
          internalTokenId: curr.internalTokenId,
          tokens: [curr.token]
        };
      }
      return acc;
    }, {}));

    const output1155 = Object.values(erc1155GameAssets.reduce((acc, curr) => {
      const key = `${curr.assetId}-${curr.internalTokenId}`;
      if (acc[key]) {
        acc[key].tokens.push(curr.token);
      } else {
        acc[key] = {
          assetId: curr.assetId,
          internalTokenId: curr.internalTokenId,
          tokens: [curr.token]
        };
      }
      return acc;
    }, {}));

    return output721.concat(output1155);
  };

  const process721Async = async (asset) => {
    const ERC721Contract = new ethers.Contract(asset.address, erc721Abi, provider);

    return ERC721Contract.balanceOf(walletAddress).then(tokenBalance => {
      console.log(`process721Async ${asset.assetId}: balanceOf: ${tokenBalance.toNumber()}`);
      const tokenBalanceNum = tokenBalance.toNumber();
      let tokenPromises = [];
      for (let index = 0; index < tokenBalanceNum; index++) {
        tokenPromises.push(ERC721Contract.tokenOfOwnerByIndex(walletAddress, index).then(tokenId => {
          console.log(`process721Async ${asset.assetId}: tokenOfOwnerByIndex: ${index} tokenId: ${tokenId.toString()}`);
          // Convert custom token ID to binary
          let bn2 = ethers.BigNumber.from(tokenId.toString());
          let bn2SmartContractAddress = ethers.BigNumber.from(asset.address);
          const internalTokenId = getInternalTokenIdFromCustomTokenId(tokenId);
          for (let j = 0; j < asset.gameData.length; j++) {
            const assetData = asset.gameData[j];
            if (internalTokenId.isEqualTo(assetData.tokenId)) {
              erc721GameAssets.push({
                assetId: assetData.assetId,
                internalTokenId: assetData.tokenId,
                token: {
                  type: "erc721",
                  analyticId: `${bn2SmartContractAddress.toHexString()}:${bn2.toHexString()}`,
                  smartContractId: asset.address,
                  internalTokenId: assetData.tokenId,
                  // NB force customTokenId to a string for consistency
                  customTokenId: tokenId.toString()
                }
              });
              console.log(`...process721Async ${asset.assetId}: tokenOfOwnerByIndex: ${index} tokenId: ${tokenId.toString()} - PUSHED`);
              break;
            }
          }
        }).catch(err => {
          console.log('process721 tokenOfOwnerByIndex ERROR', err);
        }));
      }
      return Promise.all(tokenPromises);
    }).catch(err => {
      console.log('process721 balanceOf ERROR', err);
    });
  };

  const process1155Async = async (asset) => {
    try {
      let bn2SmartContractAddress = ethers.BigNumber.from(asset.address);
      let tokenPromises = [];
      for (let j = 0; j < asset.gameData.length; j++) {
        const assetData = asset.gameData[j];
        const ERC1155Contract = new ethers.Contract(asset.address, erc1155Abi, provider);
        tokenPromises.push(ERC1155Contract.balanceOf(walletAddress, assetData.tokenId).then(tokenBalance => {
          console.log(`process1155Async ${asset.assetId}: balanceOf: ${tokenBalance.toNumber()}`);
          if (tokenBalance.toNumber() > 0) {
            erc1155GameAssets.push({
              assetId: assetData.assetId,
              internalTokenId: assetData.tokenId,
              token: {
                type: "erc1155",
                analyticId: `${bn2SmartContractAddress.toHexString()}:${assetData.tokenId}`,
                smartContractId: asset.address,
                internalTokenId: assetData.tokenId,
                // NB force customTokenId to a string for consistency
                customTokenId: String(assetData.tokenId),
                value: tokenBalance.toNumber()
              }
            })
          }
        }).catch(err => {
          console.log('process1155 balanceOf ERROR', err);
        }));
      }
      return Promise.all(tokenPromises);
    } catch (e) {
      console.log('.....ERROR', e);
    }
  };

  const process721Sync = async (asset) => {
    console.log(`...process721Sync ${asset.assetId}`);

    try {
      const ERC721Contract = new ethers.Contract(asset.address, erc721Abi, provider);
      const tokenBalance = await ERC721Contract.balanceOf(walletAddress);
      const tokenBalanceNum = tokenBalance.toNumber();

      for (let index = 0; index < tokenBalanceNum; index++) {
        console.log(`.....tokenOfOwnerByIndex ${walletAddress} ${index}`);
        const tokenId = await ERC721Contract.tokenOfOwnerByIndex(walletAddress, index);
        // Convert custom token ID to binary
        let bn2 = ethers.BigNumber.from(String(tokenId.toString()));
        let bn2SmartContractAddress = ethers.BigNumber.from(asset.address);
        const internalTokenId = getInternalTokenIdFromCustomTokenId(tokenId.toString());
        for (let j = 0; j < asset.gameData.length; j++) {
          const assetData = asset.gameData[j];
          if (internalTokenId.isEqualTo(assetData.tokenId)) {
            erc721GameAssets.push({
              assetId: assetData.assetId,
              internalTokenId: assetData.tokenId,
              token: {
                type: "erc721",
                analyticId: `${bn2SmartContractAddress.toHexString()}:${bn2.toHexString()}`,
                smartContractId: asset.address,
                internalTokenId: assetData.tokenId,
                // NB force customTokenId to a string for consistency
                customTokenId: tokenId.toString()
              }
            })
          }
        }
      }
    } catch (e) {
      console.log('.....ERROR', e);
    }
  };

  const process1155Sync = async (asset) => {
    try {
      let bn2SmartContractAddress = ethers.BigNumber.from(asset.address);
      for (let j = 0; j < asset.gameData.length; j++) {
        const assetData = asset.gameData[j];
        const ERC1155Contract = new ethers.Contract(asset.address, erc1155Abi, provider);
        const tokenBalance = await ERC1155Contract.balanceOf(walletAddress, assetData.tokenId);
        if (tokenBalance.toNumber() > 0) {
          erc1155GameAssets.push({
            assetId: assetData.assetId,
            internalTokenId: assetData.tokenId,
            token: {
              type: "erc1155",
              analyticId: `${bn2SmartContractAddress.toHexString()}:${assetData.tokenId}`,
              smartContractId: asset.address,
              internalTokenId: assetData.tokenId,
              // NB force customTokenId to a string for consistency
              customTokenId: String(assetData.tokenId),
              value: tokenBalance.toNumber()
            }
          })
        }
      }
    } catch (e) {
      console.log('.....ERROR', e);
    }
  };


  const startTime = performance.now();

  if (method === 'sync') {
    for (const asset of assetList) {
      switch (asset.tokenType.toLowerCase()) {
        case 'erc721':
          console.log(`Processing 721 ${asset.assetId}`);
          await process721Sync(asset);
          break;
        case 'erc1155':
          console.log(`Processing 1155 ${asset.assetId}`);
          await process1155Sync(asset);
          break;
        default:
          return null;
      }
    }

    const endTime = performance.now();
    console.log(`SYNC TIMING ${endTime-startTime} ms`);

    return {
      data: processResults(),
      timing: endTime - startTime,
    };
  } else {
    let promises = [];

    // wrapping the following code in a for loop is a quick and easy
    // way to test greater loads of assets to check for
    // for (let i = 0; i < 1; i++) {
      const promises2 = assetList.map(asset => {
        switch (asset.tokenType.toLowerCase()) {
          case 'erc721':
            return process721Async(asset);
          case 'erc1155':
            return process1155Async(asset);
          default:
            return null;
        }
      });
      promises = promises.concat(promises2);
    // }

    console.log(`ASYNC PROMISES ${promises.length}`);

    return Promise.all(promises).then(() => {
      const endTime = performance.now();
      console.log(`ASYNC TIMING ${endTime-startTime} ms`);
      return {
        data: processResults(),
        timing: endTime - startTime,
      };
    }).catch(e => {
      console.log('Svc:ethers:getBalanceOfWalletForGame ERROR', e);
      errorService.stashInternalErrorFromException(e, 'Svc:Ethers:getBalanceOfWalletForGame: ');
      return false;
    });
  }
}
