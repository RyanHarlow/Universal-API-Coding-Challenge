const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const getTrackByISRC = require("./spotify/getTrackByISRC");
const Track = require("./models/track");
const {initModels} = require('./config/initModels');
const { Op, QueryTypes} = require("sequelize");
const { sq } = require("./config/db");


initModels();

app.post("/api/tracks/:isrc", async (req, res) => {
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

app.get("/api/tracks/:isrc", async (req,res) => {
  const isrc = req.params.isrc;

  const track = await Track.findOne({ where: { isrc } });
  if (track === null) {
    res.status(404).send({});
  } else {
    res.status(200).send({...track.dataValues});
  }


})

app.get("/api/tracks", async (req,res) => {
  res.send(`getting tracks by artist ${req.query.artist}`)

  let track = await sq.query(
    "select * from tracks where exists (select from unnest(artist_list) elem where elem ilike ?)",
    {
      replacements: [`%${req.query.artist}%`],
      type: QueryTypes.SELECT
    }
  );

console.log(track)


})


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

fetch("http://localhost:3000/api/tracks/USHR11233750", {
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


