

const TORQUE_BURNOUT = 'tb';
const TORQUE_DRIFT = 'td';
const TORQUE_DRIFT2 = 'td2';
const ALL_GAME_IDS = [TORQUE_BURNOUT, TORQUE_DRIFT, TORQUE_DRIFT2];


/**
 * Check a game id.
 * @param {string} gameId
 * @returns {boolean}
 */
const isValidGameId = (gameId) => {
  return gameId && ALL_GAME_IDS.indexOf(gameId) >= 0;
};


module.exports = {
  TORQUE_BURNOUT,
  TORQUE_DRIFT,
  TORQUE_DRIFT2,
  ALL_GAME_IDS,
  isValidGameId,
};
