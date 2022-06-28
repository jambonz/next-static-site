export interface ClassNameObjectType {
  [key: string]: boolean;
}

export const classNames = (o: ClassNameObjectType) => {
  return Object.keys(o)
    .filter(k => (o[k] === true))
    .join(' ');
};
