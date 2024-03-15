const { sequelize } = require("../database/connection");

const models = {
  Asset: require("./Asset")(sequelize),
};

Object.keys(models).forEach((modelName) => {
  if (typeof models[modelName].associate === 'function') {
    models[modelName].associate(models);
  }
});

module.exports = models;
