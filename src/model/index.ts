import Poap from "./Poap";
import Owner from "./Owner";
import Event from "./Event";

Owner.hasMany(Poap, { foreignKey: 'ownerId' })
Poap.belongsTo(Owner, { foreignKey: 'ownerId' })

Owner.hasMany(Event, { foreignKey: 'ownerId' })
Event.belongsTo(Owner, { foreignKey: 'ownerId' })

Event.hasMany(Poap, { foreignKey: 'eventId' })
Poap.belongsTo(Event, { foreignKey: 'eventId' })

export {Poap, Owner, Event}