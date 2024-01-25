async function fetchSpotifyAPI() {
    const CLIENT_ID = '';
    const CLIENT_SECRET = '';
    const playlistId = "2hEfevLS7w2zcWWGdEmbDj"; // Playlist ID for "Nostalgic Bollywood Songs (2000-2010)"

    // Request access token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}` // Base64 encode the client ID and client secret
        },
        body: "grant_type=client_credentials"
    });

    const tokenData = await tokenResponse.json();

    // Use the obtained access token to make a request to the Spotify API
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Randomly select a track
            const randomIndex = Math.floor(Math.random() * data.items.length);
            const chosenTrack = data.items[randomIndex].track;
            // Open Spotify app or website
            window.location.href = `spotify:track:${chosenTrack.id}`;

        })
        .catch(error => console.error('Error fetching playlist tracks:', error));
}

document.getElementById("btn").addEventListener("click", fetchSpotifyAPI);
