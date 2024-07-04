import Poap from "./Poap";
import Owner from "./Owner";
import Event from "./Event";
import Issuer from "./Issuer";
import EventPoap from "./EventPoap";

Owner.hasMany(Poap, { foreignKey: "ownerUuid" });
Poap.belongsTo(Owner, { foreignKey: "ownerUuid" });

Issuer.hasMany(Event, { foreignKey: "issuerUuid" });
Event.belongsTo(Issuer, { foreignKey: "issuerUuid" });

Event.belongsToMany(Poap, {
  through: EventPoap,
  foreignKey: "eventUuid",
  otherKey: "poapUuid",
});
Poap.belongsToMany(Event, {
  through: EventPoap,
  foreignKey: "poapUuid",
  otherKey: "eventUuid",
});

export { Poap, Owner, Event, Issuer, EventPoap };
