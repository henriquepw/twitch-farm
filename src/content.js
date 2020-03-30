function claimPoints() {
  const [button] = document.getElementsByClassName("claimable-bonus__icon");

  if (button) {
    button.click();
    console.log("claim +50");
  }
}

chrome.runtime.onMessage.addListener(req => {
  if (req.message === "claim") claimPoints();
});
