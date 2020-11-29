// Called when user clicks the fake news icon
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({"url": "https://www.ryanckulp.com/projects"});
});
