export const checkThemeProp = (theme, prop) =>
  // eslint-disable-next-line no-prototype-builtins
  theme.hasOwnProperty(prop) ? theme[prop] : prop
