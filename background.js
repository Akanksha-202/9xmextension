// background.js

let currentTrackId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'playTrack' && request.trackId) {
    if (currentTrackId !== request.trackId) {
      currentTrackId = request.trackId;
      chrome.tabs.query({ active: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
          chrome.tabs.sendMessage(activeTab.id, { action: 'playTrack', trackId: currentTrackId });
        }
      });
    }
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (removeInfo.isWindowClosing) {
    // Handle tab/window closed event
    // You may want to stop playing or handle any cleanup here
  }
});
