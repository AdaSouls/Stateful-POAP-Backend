const httpStatus = require("http-status");
const catchAsync = require("../util/catchAsync");
const { codeService, errorService, walletService, alchemyService } = require("../service");

/**
 * Get wallet contents as per our asset list.
 */
const getWalletContent = catchAsync(async (req, res) => {
  if (!codeService.checkCode(req, "getWalletContent")) {
    errorService.emitStashedError(res);
    return;
  }

  console.log('CONTROLLER getWalletContent', req.body);

  const { gameId, userId, walletAddress, smartWalletAddress, forceRefresh, method } = req.body;
  const resp = await walletService.getContents(gameId, userId, walletAddress, smartWalletAddress, forceRefresh, method);

  if (resp === false) {
    errorService.emitStashedError(res);
    return;
  }

  res.status(httpStatus.OK).send({
    gameId,
    userId,
    address: walletAddress || null,
    smartWalletAddress: smartWalletAddress || null,
    fromCacheNft: resp.fromCacheNftAddress,
    timingNft: resp.timingExtNft,
    fromCacheNftSmart: resp.fromCacheNftSmartAddress,
    timingSmartNft: resp.timingSmartNft,
    //fromCacheWeb2: resp.fromCacheWeb2,
    //timingWeb2: resp.timingWeb2,
    nftWalletDiscovery: resp.method,
    data: resp.data,
    currencies: resp.currencies,
  });
});

/**
 * Mark a wallet as dirty, either for a particular game, or all games.
 */
const markWallet = catchAsync(async (req, res) => {
  if (!codeService.checkCode(req, "markWallet")) {
    errorService.emitStashedError(res);
    return;
  }

  const { gameId, walletAddress } = req.body;
  const resp = await walletService.markWalletAsDirtyForGame(
    walletAddress,
    gameId
  );

  if (!resp) {
    errorService.internalError(res);
    return;
  }

  res.status(httpStatus.OK).send({ success: "ok" });
});

/**
 * Mark a userId as dirty, either for a particular game, or all games.
 */
const markUserId = catchAsync(async (req, res) => {
  if (!codeService.checkCode(req, "markUserId")) {
    errorService.emitStashedError(res);
    return;
  }

  const { gameId, userId } = req.body;
  const resp = await walletService.markUserIdAsDirtyForGame(userId, gameId);

  if (!resp) {
    errorService.internalError(res);
    return;
  }

  res.status(httpStatus.OK).send({ success: "ok" });
});

/**
 * Clear out our cache for all wallets/games.
 */
const flushCache = catchAsync(async (req, res) => {
  if (!codeService.checkCode(req, "flushCache")) {
    errorService.emitStashedError(res);
    return;
  }

  const resp = await walletService.flushEntireWalletCache();

  if (!resp) {
    errorService.internalError(res);
    return;
  }

  res.status(httpStatus.OK).send({ success: "ok" });
});

/**
 * Get checkout wallet sales details.
 */
const getCheckoutWalletDetails = catchAsync(async (req, res) => {
  if (!codeService.checkCode(req, "getCheckoutWalletDetails")) {
    errorService.emitStashedError(res);
    return;
  }

  const { checkoutWalletAddress, fromDate, toDate, erc721 } = req.body;

  const resp = await alchemyService.getCheckoutWalletDetails(checkoutWalletAddress, fromDate, toDate, erc721);

  if (resp === false) {
    errorService.emitStashedError(res);
    return;
  }

  res.status(httpStatus.OK).send({
    checkoutWallet: checkoutWalletAddress,
    fromDate,
    toDate,
    fromBlock: resp.fromBlock,
    toBlock: resp.toBlock,
    records: resp.detailAmount,
    data: resp.details,
  });
});

module.exports = {
  getWalletContent,
  markUserId,
  markWallet,
  flushCache,
  getCheckoutWalletDetails,
};
