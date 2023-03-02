export const persistLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify({ ...{ id: 1 }, ...value }));
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
