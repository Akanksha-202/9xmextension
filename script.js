const colors = ['#FFEB3B', '#D81B60', '#F44336']; // Mustard, Magenta Pink, Red
let currentColorIndex = 0;

async function fetchSpotifyAPI() {
    const CLIENT_ID = 'ebcac475c56548ff82375d7c912e916b';
    const CLIENT_SECRET = 'd128c3f604ef430ab72613ccd5b51c00';
    const playlistId = "2hEfevLS7w2zcWWGdEmbDj"; // Playlist ID

    // Request access token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
        },
        body: "grant_type=client_credentials"
    });

    const tokenData = await tokenResponse.json();

    // Fetch playlist tracks
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`
        }
    });

    const data = await response.json();

    // Randomly select a track
    const randomIndex = Math.floor(Math.random() * data.items.length);
    const chosenTrack = data.items[randomIndex].track;

    // Embed the Spotify Play Button widget
    const playButtonHTML = `
        <iframe src="https://open.spotify.com/embed/track/${chosenTrack.id}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    `;
    const playerContainer = document.getElementById('spotify-player');
    playerContainer.innerHTML = playButtonHTML;

    // Change background color
    document.querySelector('.player-container').style.backgroundColor = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

document.getElementById("btn").addEventListener("click", fetchSpotifyAPI);
