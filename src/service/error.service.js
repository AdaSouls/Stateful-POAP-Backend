/*
|--------------------------------------------------------------------------
| Predeclare exports (to mitigate circular dependencies).
|--------------------------------------------------------------------------
*/

module.exports = {
  stashError,
  stashUnauthorized,
  stashBadRequest,
  stashNotFound,
  stashInternalError,
  stashInternalErrorFromException,
  getLastErrorStatus,
  getLastErrorMsg,
  emitStashedError,
  unauthorized,
  badRequest,
  notFound,
};



const httpStatus = require('http-status');


/**
 * Stash errors.
 */
let errorStatus;
let errorMsg;


/*
|--------------------------------------------------------------------------
| Stashing errors.
|--------------------------------------------------------------------------
*/

/**
 * Stash an error.
 * @param {int} status
 * @param {string} msg
 */
function stashError(status, msg = '') {
  console.log('STASHING ERROR', status, msg);
  errorStatus = status;
  errorMsg = msg;
}

/**
 * Stash UNAUTHORIZED.
 * @param {object} res
 * @param {string} msg
 */
function stashUnauthorized(msg = 'Unauthorized') {
  stashError(httpStatus.UNAUTHORIZED, msg);
}

/**
 * Stash BAD_REQUEST.
 * @param {object} res
 * @param {string} msg
 */
function stashBadRequest(msg = null) {
  stashError(httpStatus.BAD_REQUEST, msg);
}

/**
 * Stash NOT_FOUND.
 * @param {object} res
 * @param {string} msg
 */
function stashNotFound(msg = null) {
  stashError(httpStatus.NOT_FOUND, msg);
}

/**
 * Stash INTERNAL_SERVER_ERROR.
 * @param {object} res
 * @param {string} msg
 */
function stashInternalError(msg = null) {
  stashError(httpStatus.INTERNAL_SERVER_ERROR, msg);
}

/**
 * Stash INTERNAL_SERVER_ERROR from an exception.
 * @param {object} res
 * @param {string} msg
 */
function stashInternalErrorFromException(e, leadin = '') {
  stashError(httpStatus.INTERNAL_SERVER_ERROR, `${leadin}${e.message}`);
}

/**
 * Get last error status.
 *
 * @return {int}
 */
function getLastErrorStatus() {
  return errorStatus;
}

/**
 * Get last error message.
 *
 * @return {string}
 */
function getLastErrorMsg() {
  return errorMsg;
}

/**
 * Emit a stashed error.
 */
function emitStashedError(res) {
  let resp = { status: errorStatus };
  if (errorMsg) {
    resp.message = errorMsg;
  }

  res.status(errorStatus).json(resp);
}


/*
|--------------------------------------------------------------------------
| Helpers to emit errors straight away.
|--------------------------------------------------------------------------
*/

/**
 * Emit UNAUTHORIZED.
 * @param {object} res
 * @param {string} msg
 */
function unauthorized(res, msg = 'Unauthorized') {
  res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, message: msg });
}

/**
 * Emit BAD_REQUEST.
 * @param {object} res
 * @param {string} msg
 */
function badRequest(res, msg = null) {
  res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: msg });
}

/**
 * Emit NOT_FOUND.
 * @param {object} res
 * @param {string} msg
 */
function notFound(res, msg = null) {
  res.status(httpStatus.NOT_FOUND).json({ status: httpStatus.NOT_FOUND, message: msg });
}

/**
 * Emit INTERNAL_SERVER_ERROR.
 * @param {object} res
 * @param {string} msg
 */
function internalError(res, msg = null) {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: msg });
}
