let activeTabs = [];

function sendClaimMassage() {
  console.log("send");

  activeTabs.forEach(tab => {
    chrome.tabs.sendMessage(tab, {
      message: "claim"
    });
  });
}

chrome.storage.sync.get(["time"], data => {
  const interval = typeof data.time === "number" ? data.time : 10;

  // 1000 = 1s
  setInterval(sendClaimMassage, interval * 1000);
});

chrome.browserAction.onClicked.addListener(tab => {
  if (activeTabs.includes(tab.id)) {
    activeTabs = activeTabs.filter(tabId => tabId !== tab.id);
  } else {
    activeTabs.push(tab.id);
  }

  console.log(activeTabs);
  chrome.browserAction.setBadgeText({ text: String(activeTabs.length) });
});
