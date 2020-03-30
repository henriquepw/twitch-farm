function claimPoints() {
  console.log("claim");
  const [button] = document.getElementsByClassName("claimable-bonus__icon tw-flex");

  if(button) button.click();
}

chrome.runtime.onMessage.addListener(req => {
  if(req.message === 'claim') claimPoints();
});
