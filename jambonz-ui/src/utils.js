export const classNames = (o) => {
  return Object.keys(o)
    .filter(k => (o[k] === true))
    .join(' ');
};
