const { address, gameId } = require("./custom.validation");
const Joi = require("joi")
  .extend(require("@joi/date"));

const getWalletContent = {
  body: Joi.object().keys({
    gameId: Joi.string().required().custom(gameId),
    mvUserId: Joi.string().optional().allow(null),
    walletAddress: Joi.string().optional().allow(null).custom(address),
    smartWalletAddress: Joi.string().optional().allow(null).custom(address),
    forceRefresh: Joi.boolean().optional().default(false),
    method: Joi.string().optional().allow(null),
  }),
};

module.exports = {
  getWalletContent,
};
