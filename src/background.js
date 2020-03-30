let activeTabs = [];

function sendClaimMassage() {
  console.log("send");

  activeTabs.forEach(tab => {
    chrome.tabs.sendMessage(tab, {
      message: "claim"
    });
  });
}

// 50000 = 5min
setInterval(sendClaimMassage, 50000);

chrome.browserAction.onClicked.addListener(tab => {
  if (activeTabs.includes(tab.id)) {
    activeTabs = activeTabs.filter(tabId => tabId !== tab.id);
  } else {
    activeTabs.push(tab.id);
  }

  console.log(activeTabs);
  chrome.browserAction.setBadgeText({ text: String(activeTabs.length) });
});
