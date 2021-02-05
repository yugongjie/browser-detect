export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => localStorage.getItem(key);

export const setSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const getSessionStorage = (key: string) => sessionStorage.getItem(key);
