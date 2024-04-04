import { EventType, PoapType } from "../common/enums";

export const validateEventType = (value: any, helpers: any) => {
  if (!value && helpers.prefs.presence === 'optional') {
    return value;
  }
  if (Object.keys(EventType).indexOf(value) === -1) {
    return helpers.message('Invalid event type');
  }
  return value;
}
export const validatePoapType = (value: any, helpers: any) => {
  if (!value && helpers.prefs.presence === 'optional') {
    return value;
  }
  if (Object.keys(PoapType).indexOf(value) === -1) {
    return helpers.message('Invalid poap type');
  }
  return value;
}