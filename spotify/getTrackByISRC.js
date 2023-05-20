const getSpotifyToken = require("./getSpotifyToken");

async function getTrackByISRC(isrc) {
  const spotifyAuth = await getSpotifyToken();

  let tracks = await fetch(
    `https://api.spotify.com/v1/search?q=isrc:${isrc}&type=track`,
    {
      headers: {
        Authorization: `${spotifyAuth.token_type} ${spotifyAuth.access_token}`,
      },
    }
  );

  let tracksJSON = await tracks.json()
    console.log(tracksJSON)




}

module.exports = getTrackByISRC;
