let activeTabs = [];

function sendClaimMassage() {
  console.log('send');

  activeTabs.forEach(tab => {
    chrome.tabs.sendMessage(tab, {
      message: 'claim',
    });
  });
}

setInterval(sendClaimMassage, 5000);

chrome.browserAction.onClicked.addListener(tab => {  
  if (activeTabs.includes(tab.id)) {
    activeTabs = activeTabs.filter(tabId => tabId !== tab.id);
    console.log(activeTabs);
    return;
  }
  
  activeTabs.push(tab.id);
  console.log(activeTabs);
});