/*
|--------------------------------------------------------------------------
| Predeclare exports (to mitigate circular dependencies).
|--------------------------------------------------------------------------
*/

module.exports = {
  checkCode,
};



const config = require('../config/config');
const errorService = require('./error.service');


/**
 * Check a function code.
 * @param {object} req
 * @param {string} func
 * @returns {boolean}
 */
function checkCode(req, func) {
  if (req.query.code == config.functionCodes.master) {
    return true;
  }

  // only use master code now
  /*********
  if (req.query.code !== config.functionCodes[func]) {
    errorService.stashUnauthorized();
    return false;
  }

  return true;
  **********/

  return false;
}
