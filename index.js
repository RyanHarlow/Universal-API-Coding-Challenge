const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const getTrackByISRC = require("./spotify/getTrackByISRC");
const Track = require("./models/track");
const {initModels} = require('./config/initModels');

initModels();

app.post("/api/track/:isrc", async (req, res) => {
  let track = await getTrackByISRC(req.params.isrc);
  console.log(track.album.images)

  let isrc = track.external_ids.isrc;
  let spotify_image_uri = track.album.images[0].url;
  let title = track.name;
  let artist_list = track.artists.map(artist => artist.name);

  upsert({ isrc, spotify_image_uri, title, artist_list }, { isrc }).then(function(result){
    res.status(200).send({...result.dataValues});
  });

});



app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

fetch("http://localhost:3000/api/track/USHR11233750", {
  method: "POST",
});


function upsert(values, condition) {
  return Track
      .findOne({ where: condition })
      .then(function(obj) {
          // update
          if(obj)
              return obj.update(values);
          // insert
          return Track.create(values);
      })
}


