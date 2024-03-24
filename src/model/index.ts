// const { sequelize } = require("../database/connection");

// const models = {
//   Asset: require("./Asset")(sequelize),
// };

// Object.keys(models).forEach((modelName) => {
//   if (typeof models[modelName].associate === 'function') {
//     models[modelName].associate(models);
//   }
// });

// module.exports = models;


import Poap from "./Poap";
import Owner from "./Owner";
import Event from "./Event";

Owner.hasMany(Poap)
Poap.belongsTo(Owner)

Event.hasMany(Poap)
Poap.belongsTo(Event)

export {Poap, Owner, Event}