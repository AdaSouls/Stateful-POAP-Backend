import Poap from "./Poap";
import Owner from "./Owner";
import Event from "./Event";
import Issuer from "./Issuer";

Owner.hasMany(Poap, { foreignKey: 'ownerId' })
Poap.belongsTo(Owner, { foreignKey: 'ownerId' })

Issuer.hasMany(Event, { foreignKey: 'issuerId' })
Event.belongsTo(Issuer, { foreignKey: 'issuerId' })

Event.belongsToMany(Poap, { through: 'eventPoap' })
Poap.belongsToMany(Event, { through: 'eventPoap' })

export {Poap, Owner, Event, Issuer}