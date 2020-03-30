let activeTabs = [];
let interval = undefined;

function sendClaimMassage() {
  console.log("send");

  activeTabs.forEach(tab => {
    chrome.tabs.sendMessage(tab, {
      message: "claim"
    });
  });
}

function setBadge(count) {
  const text = count === 0 ? "" : count > 9 ? "9+" : String(count);

  chrome.browserAction.setBadgeText({ text });
}

function newInterval(time) {
  interval && clearInterval(interval);

  const seconds = typeof time === "string" ? +time : 10;

  interval = setInterval(sendClaimMassage, seconds * 1000);
}

chrome.storage.sync.get(["time"], data => {
  newInterval(data.time);
});

chrome.storage.onChanged.addListener(data => {
  newInterval(data.time.newValue);
});

chrome.browserAction.onClicked.addListener(tab => {
  if (activeTabs.includes(tab.id)) {
    activeTabs = activeTabs.filter(tabId => tabId !== tab.id);
  } else {
    activeTabs.push(tab.id);
  }

  console.log(activeTabs);
  setBadge(activeTabs.length);
});

chrome.tabs.onRemoved.addListener(tabId => {
  activeTabs = activeTabs.filter(tab => tab !== tabId);

  setBadge(activeTabs.length);
});
