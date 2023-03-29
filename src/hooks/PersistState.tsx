const useLocalStorage = (key: string): Function[] => {
  const getLocalStorage = () => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  const setLocalStorage = (value: Object) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeLocalStorage = () => {
    localStorage.removeItem(key);
  };

  return [getLocalStorage, setLocalStorage, removeLocalStorage];
};

export default useLocalStorage;
