import store from 'store2';

const _prefix = 'ChatApp_';

const _getRealKey = (key: string, noPrefix = false) => {
  if (noPrefix) return key;
  return _prefix + key;
};

export const setLocalData = (key: string, data: any, noPrefix?: boolean) => {
  const realKey = _getRealKey(key, noPrefix);
  return store.set(realKey, data);
};

export const getLocalData = (key: string, noPrefix?: boolean) => {
  const realKey = _getRealKey(key, noPrefix);
  return store.get(realKey);
};

export const removeLocalData = (key: string, noPrefix?: boolean) => {
  const realKey = _getRealKey(key, noPrefix);
  return store.remove(realKey);
};

export const removeAllData = () => {
  return store.clearAll();
};
