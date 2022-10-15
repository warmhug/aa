
const setStorage = async (kv) => {
  const localRes = await chrome.storage.local.set(kv);
  // console.log('local Value is set ', localRes);
  const syncRes = await chrome.storage.sync.set(kv);
  // console.log('sync Value is set ', syncRes);
}
const getStorage = async (kv) => {
  const localRes = await chrome.storage.local.get(kv);
  // console.log('local Value is get ', localRes);
  const syncRes = await chrome.storage.sync.get(kv);
  // console.log('sync Value is get', syncRes);
  return localRes || syncRes;
}
