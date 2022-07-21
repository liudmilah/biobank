export const lsSet = (key, value) => window.localStorage.setItem(key, value);
export const lsGet = (key, defaultValue) => window.localStorage.getItem(key) || defaultValue;
