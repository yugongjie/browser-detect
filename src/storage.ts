export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const setSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const getSessionStorage = (key: string) => {
  return localStorage.getItem(key);
};
