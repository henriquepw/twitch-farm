function claimPoints() {
  console.log("claim");
  const [button] = document.getElementsByClassName("claimable-bonus__icon tw-flex");

  if(button) button.click();
}

//setInterval(claimPoints, 5000); // 50000 = 5min

chrome.runtime.onMessage.addListener(req => {
  if(req.message === 'claim') setInterval(claimPoints, 5000);
});
