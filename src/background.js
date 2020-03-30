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

/**
 * init interval
 */
chrome.storage.sync.get(["time"], data => newInterval(data.time));

/**
 * Update the interval when storage changes
 */
chrome.storage.onChanged.addListener(data => newInterval(data.time.newValue));

/**
 * When the user clicking on the extension button,
 * if the tab is included on the list, remove then,
 * if not, add the tab on the active list
 * and update the badge with the list length
 */
chrome.browserAction.onClicked.addListener(tab => {
  if (activeTabs.includes(tab.id)) {
    activeTabs = activeTabs.filter(tabId => tabId !== tab.id);
  } else {
    activeTabs.push(tab.id);
  }

  console.log(activeTabs);
  setBadge(activeTabs.length);
});

/**
 * If some active tab has closed, remove then from list and update badge
 */
chrome.tabs.onRemoved.addListener(tabId => {
  activeTabs = activeTabs.filter(tab => tab !== tabId);

  setBadge(activeTabs.length);
});
