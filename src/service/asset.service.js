/*
|--------------------------------------------------------------------------
| Predeclare exports (to mitigate circular dependencies).
|--------------------------------------------------------------------------
*/

module.exports = {
  getAllNftAssets,
  getNftAssetByAddress,
  getNftAddressesForGame,
  syncNftAsset,
  deleteNftAsset,
};


const models = require("../model");
const errorService = require("./error.service");
const config = require('../config/config');

/*
|--------------------------------------------------------------------------
| NFT assets, basic CRUD support.
|--------------------------------------------------------------------------
*/

/**
 * Get all NFT assets.
 */
async function getAllNftAssets() {
  try {

    let assets = await models.Asset.findAll();
    console.log("Svc:Assets:getAllNftAssets: FROM DB");

    return assets;
  } catch (e) {
    console.log("Svc:Assets:getAllAssets error", e);
    errorService.stashInternalErrorFromException(e, "Svc:Assets:getAllAssets: ");
    return false;
  }
}

/**
 * Get a single NFT asset by smart contract address.
 */
async function getNftAssetByAddress(address) {
  try {
    // getting the full asset list forces a re-caching if not currently in cache
    let assets = await getAllNftAssets();
    if (assets === false) {
      errorService.stashInternalError('Error getting assets');
      return false;
    }

    address = address.toLowerCase();
    const asset = assets.find((asset) => asset.address === address);
    if (!asset) {
      errorService.stashNotFound('Asset not found');
      return false;
    }

    return asset;
  } catch (e) {
    errorService.stashInternalErrorFromException(e, "Svc:Assets:getAssetByAddress: ");
    return false;
  }
}

/**
 * Get all nft addresses for the given game. To be included it has to have
 * some game data for the game.
 */
async function getNftAddressesForGame(gameId, assets = null) {
  try {

    if (!assets) {
      assets = await getAllNftAssets();
    }
    let addresses = [];

    for (const asset of assets) {
      if (asset.chain != config.web3.chain) {
        continue;
      }

      const gameData = (asset.gameData || []).find(item => item.gameId === gameId)
      if (gameData) {
        addresses.push(asset.address);
      }
    }

    return addresses;
  } catch (e) {
    console.log("Svc:Assets:getNftAddressesForGame error", e);
    errorService.stashInternalErrorFromException(e, "Svc:Assets:getNftAddressesForGame: ");
    return false;
  }
}


/**
 * Sync an NFT asset - update if exists, o/w create.
 */
async function syncNftAsset(asset) {
  try {
    asset.tokenType = asset.tokenType?.toLowerCase();
    asset.chain = asset.chain?.toLowerCase();
    asset.address = asset.address?.toLowerCase();
    asset.operatorAddress = asset.operatorAddress?.toLowerCase();

    const [syncedAsset, created] = await models.Asset.upsert(asset, {
      fields: Object.keys(asset),
      conflictFields: ["address"],
    });

    return { asset: syncedAsset, created };
  } catch (e) {
    console.log("Svc:Assets:syncNftAsset upsert error", e);
    errorService.stashInternalErrorFromException(e, "Svc:Assets:syncNftAsset: ");
    return false;
  }
}

/**
 * Delete an NFT asset.
 */
async function deleteNftAsset(address) {
  try {
    const asset = await models.Asset.findOne({
      where: { address: address.toLowerCase() },
    });

    if (!asset) {
      errorService.stashNotFound("Asset not found");
      return false;
    }

    await asset.destroy();

    return true;
  } catch (e) {
    console.log("Svc:Assets:deleteAsset error", e);
    errorService.stashInternalErrorFromException(e, "Svc:Assets:deleteAsset: ");
    return false;
  }
}
