const activeTabs = [];

chrome.browserAction.onClicked.addListener(tab => {
  console.log(tab);
  activeTabs.push(tab.id);

  chrome.tabs.sendMessage(tab.id, {
    message: 'claim',
  });
});