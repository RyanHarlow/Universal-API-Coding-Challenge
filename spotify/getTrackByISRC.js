const getSpotifyToken = require("./getSpotifyToken");

async function getTrackByISRC(isrc) {
  const spotifyAuth = await getSpotifyToken();

  //set first url for spotify query
  let spotifyURL = `https://api.spotify.com/v1/search?q=isrc:${isrc}&type=track`;

  let mostPopularTrack = null;

  //loops through paginated spotify requests for track
  while (spotifyURL !== null) {
    let tracks = await fetch(spotifyURL, {
      headers: {
        Authorization: `${spotifyAuth.token_type} ${spotifyAuth.access_token}`,
      },
    });

    let tracksJSON = await tracks.json();
    let trackItemsJSON = tracksJSON.tracks.items;

    //determining which track is most poular
    if (mostPopularTrack === null) {
      mostPopularTrack = tracksJSON.tracks.items[0];
    }
    for (let i = 0; i < trackItemsJSON.length; i++) {
      if (trackItemsJSON[i].popularity > mostPopularTrack.popularity) {
        mostPopularTrack = trackItemsJSON[i];
      }
    }
    //setting spotify url to the next page
    spotifyURL = tracksJSON.tracks.next;
  }

  return mostPopularTrack;
}

module.exports = getTrackByISRC;
