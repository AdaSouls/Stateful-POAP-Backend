import { EventType, PoapType } from "@/common/enums";
// const { ethers } = require('ethers');
// const gameService = require('../service/game.service');

export const validateEventType = (value: any, helpers: any) => {
  if (!value && helpers.prefs.presence === 'optional') {
    return value;
  }
  if (Object.keys(EventType).indexOf(value) === -1) {
    return helpers.message('Invalid event type');
  }
  return value;
}
export const validatePoapType = (value: any, helpers: any) => {
  if (!value && helpers.prefs.presence === 'optional') {
    return value;
  }
  if (Object.keys(PoapType).indexOf(value) === -1) {
    return helpers.message('Invalid poap type');
  }
  return value;
}


// const mongodbObjectId = (value, helpers) => {
//   if (!value && helpers.prefs.presence === 'optional') {
//     return value;
//   }
//   if (!value.match(/^[0-9a-fA-F]{24}$/)) {
//     return helpers.message('"{{#label}}" must be a valid mongo id');
//   }
//   return value;
// };

// const address = (value, helpers) => {
//   if (!value && helpers.prefs.presence === 'optional') {
//     return value;
//   }
//   if (!ethers.utils.isAddress(value)) {
//     return helpers.message(`Invalid Ethereum address format: ${value}`);
//   }
//   return value;
// };

// const walletSource = (value, helpers) => {
//   if (!value && helpers.prefs.presence === 'optional') {
//     return value;
//   }
//   if (['metamask', 'wallet-connect', 'gryfyn'].indexOf(value.toLowerCase()) === -1) {
//     return helpers.message('Invalid wallet source');
//   }
//   return value;
// };

// const chain = (value, helpers) => {
//   if (!value && helpers.prefs.presence === 'optional') {
//     return value;
//   }
//   if (['polygon:mainnet', 'polygon:mumbai'].indexOf(value.toLowerCase()) === -1) {
//     return helpers.message('Invalid chain');
//   }
//   return value;
// };

// const gameId = (value, helpers) => {
//   if (!value && helpers.prefs.presence === 'optional') {
//     return value;
//   }
//   if (!gameService.isValidGameId(value)) {
//     return helpers.message('Invalid game id');
//   }
//   return value;
// };

// const tokenType = (value, helpers) => {
//   if (!value && helpers.prefs.presence === 'optional') {
//     return value;
//   }
//   if (['erc20', 'erc721', 'erc1155', 'mint-mgr'].indexOf(value.toLowerCase()) === -1) {
//     return helpers.message('Invalid asset token type');
//   }
//   return value;
// };

// const tmItemId = (value, helpers) => {
//   if (!value && helpers.prefs.presence === 'optional') {
//     return value;
//   }
//   // TODO
//   return value;
// };

// const web2AssetSource = (value, helpers) => {
//   if (!value && helpers.prefs.presence === 'optional') {
//     return value;
//   }

//   // hmmm, let it be freeform for now
//   /***
//   if (['stripe', 'promo', 'testing', 'earnt'].indexOf(value.toLowerCase()) === -1) {
//     return helpers.message('Invalid web2 asset source');
//   }
//   ***/

//   return value;
// };



// module.exports = {
//   mongodbObjectId,
//   address,
//   walletSource,
//   chain,
//   gameId,
//   tokenType,
//   tmItemId,
//   web2AssetSource,
// };
