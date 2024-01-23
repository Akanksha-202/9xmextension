// Function to fetch the Spotify API
async function fetchSpotifyAPI() {
    const CLIENT_ID = process.env.CLIENT_ID;
    const playlistId = "37i9dQZF1DX9tPFwDMOaN1"; // Playlist ID for "Nostalgic Bollywood Songs (2000-2010)"
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            Authorization: "Bearer " 
        },
    })
    .then(response => response.json())
    .then(data => {
      // Randomly select a track
      const randomIndex = Math.floor(Math.random() * data.items.length);
      const chosenTrack = data.items[randomIndex].track;
  
      // Open Spotify with the chosen track
      const spotifyUri = `spotify:track:${chosenTrack.id}`;
      window.location.href = spotifyUri;
    })
    .catch(error => console.error('Error fetching playlist tracks:', error));
}


document.getElementById("btn").addEventListener("click", fetchSpotifyAPI);


