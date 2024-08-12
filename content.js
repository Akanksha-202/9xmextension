// content.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'playTrack' && request.trackId) {
      // Use request.trackId to play the track
      // Example: You might want to find the audio element and play it
      const audioElement = document.querySelector('audio');
      if (audioElement) {
        audioElement.src = `https://open.spotify.com/embed/track/${request.trackId}`;
        audioElement.play();
      }
    }
  });
  