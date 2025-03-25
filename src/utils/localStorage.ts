export const getFromStorage = <T extends string>(key: T) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

export const setToStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
