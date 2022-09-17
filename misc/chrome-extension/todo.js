
chrome.topSites.get(data => {
  console.log('topSites', data);
});

chrome.tabs.onActivated.addListener(moveToFirstPosition);
async function moveToFirstPosition(activeInfo) {
  try {
    await chrome.tabs.move(activeInfo.tabId, {index: 0});
    console.log('Success.');
  } catch (error) {
    if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    } else {
      console.error(error);
    }
  }
}

// 2022-09-17 只返回 extensions 不会返回 app
chrome.management.getAll(data => {
  console.log('management', data.map(item => item.type));
});
