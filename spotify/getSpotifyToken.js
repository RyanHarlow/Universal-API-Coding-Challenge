//gets token good for 1 hour using client id and client secret set in .env file

async function getSpotifyToken(){
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

      let response = await fetch("https://accounts.spotify.com/api/token",{
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'grant_type': 'client_credentials'
          }),
          json: true
      });

      return await response.json()
      
}

module.exports = getSpotifyToken;