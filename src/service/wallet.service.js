/*
|--------------------------------------------------------------------------
| Predeclare exports (to mitigate circular dependencies).
|--------------------------------------------------------------------------
*/

module.exports = {
  getContents,
};



const config = require("../config/config");
const errorService = require("./error.service");
const ethersService = require("./ethers.service");
const alchemyService = require("./alchemy.service");


/**
 * Get wallet contents. Merges NFT and web2 assets. Delegates NFT content determinations to alchemy, graphql service or ethers service as appropriate.
 * Web2 data is stored in our postgres db. We cache NFT contents on a per-wallet basis, and web2 assets on a per-userId basis.
 */
async function getContents(gameId, userId, address, smartWalletAddress, forceRefresh = false, method = null) {
  console.log('WalletSvc::getContents', {gameId, userId, address, smartWalletAddress, forceRefresh, method});

  try {
    if (!method) {
      method = config.walletContentMethod;
    }
    if (!method) {
      method = 'alchemy';
    }

    /////////////////////////////////////////////////////////////
    // get NFT assets for the given wallet

    let fromCacheNftAddress = false;
    let fromCacheNftSmartAddress = false;
    let timingExtNft = null;
    let timingSmartNft = null;
    let allData = {
      data: [],
      currencies: [],
    };

    let promises = [];

    if (address) {
      console.log(`...checking ext wallet ${address}`);
      const resp = await processWeb3(allData, gameId, address, forceRefresh, method);
      if (resp) {
        fromCacheNftAddress = resp.fromCache;
        timingExtNft = resp.timing;
      }
    }
    if (smartWalletAddress) {
      console.log(`...checking smart wallet ${smartWalletAddress}`);
      const resp = await processWeb3(allData, gameId, smartWalletAddress, forceRefresh, method);
      if (resp) {
        fromCacheNftSmartAddress = resp.fromCache;
        timingSmartNft = resp.timing;
      }
    }

    let resp = { data: allData.data, method, fromCacheNftAddress, fromCacheNftSmartAddress, timingExtNft, timingSmartNft };
    if (config.walletContentErc20) {
      resp.currencies = allData.currencies;
    }

    return resp;
  } catch (e) {
    console.log('ERROR', e);
    errorService.stashInternalErrorFromException(e, "Svc:Wallet:getContents: ");

    return false;
  }
}

async function processWeb3(allData, gameId, address, forceRefresh, method) {
  //const redisKey = getRedisKeyForWalletGame(address, gameId);
  const startTime = performance.now();
  let newData = [];
  let newCurrencies = [];
  let fromCacheNft = false;
  let timing = null;

/*   if (!forceRefresh) {
    newData = await redisService.getJSON(redisKey);
    if (newData) {
      console.log("Svc:Wallet:getContents: GOT DATA FROM CACHE");
      fromCacheNft = true;
    }
  } */

  if (!fromCacheNft) {
    switch (method) {
      case "alchemy":
        console.log(alchemyService);
        resp = await alchemyService.getWalletContentsForGame(gameId, address);
        if (resp === false) {
          return null;
        }
        newData = resp.data;
        //newCurrencies = resp.currencies;
        console.log('ALCHEMY NEW DATA', address, newData);
        timing = resp.timing;
        break;

      case "ethers:async":
      case "ethers:sync":
        const syncing = /:sync$/.test(method) ? "sync" : "async";
        resp = await ethersService.getWalletContentsForGame(gameId, address, syncing);
        if (resp === false) {
          return false;
        }
        newData = resp.data;
        newCurrencies = resp.currencies;
        timing = resp.timing;
        break;

      default:
        errorService.stashBadRequest(`Invalid method: ${method}.`);
        return false;
    }
  }

  const timingNft = performance.now() - startTime;

/*   if (!fromCacheNft) {
    redisService.setJSON(redisKey, newData);
  } */

/*   newData.forEach((element) => {
    const existing = allData.data.find((asset) => asset.assetId === element.assetId);

    console.log("existing: ", existing);

    if (existing && element.type !== "erc20") {
      // console.log('...asset id exists, concat', existing.assetId, element.tokens);
      existing.tokens.concat(element.tokens);
    } else {
      // console.log('...process...no existing, push whole elem', element);
      allData.data.push(element);
    }

    // console.log('...web3 latest data', allData.data);
  }); */

  //allData.currencies = allData.currencies.concat(newCurrencies || []);
  allData.data.push(newData);
  return {fromCache: fromCacheNft, timing: timingNft};
}
