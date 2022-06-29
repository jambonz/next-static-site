export interface ClassNameObject {
  [key: string]: boolean;
}

export const classNames = (o: ClassNameObject) => {
  return Object.keys(o)
    .filter(k => (o[k] === true))
    .join(' ');
};
