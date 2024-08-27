function isEnumValue<T extends object>(enumType: T, value: any): boolean {
  return Object.values(enumType).includes(value);
}

export default isEnumValue;
