const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const getTrackByISRC = require("./spotify/getTrackByISRC");
const Track = require("./models/track");
const { initModels } = require("./config/initModels");
const { QueryTypes } = require("sequelize");
const { sq, testDB } = require("./config/db");

//tests db connection
testDB();

//create tables if they don't exist
initModels();

//create track from isrc
app.post("/api/tracks/:isrc", async (req, res) => {
  try {
    //getting track from spotify api
    let track = await getTrackByISRC(req.params.isrc);

    if (track) {
      let isrc = track.external_ids.isrc;
      let spotify_image_uri = track.album.images[0].url;
      let title = track.name;
      let artist_list = track.artists.map((artist) => artist.name);

      //create track or update if track with isrc already exists
      upsert({ isrc, spotify_image_uri, title, artist_list }, { isrc }).then(
        function (result) {
          res.status(200).send({ ...result.dataValues });
        }
      );
    } else {
      res.status(404).send({ err: "track not found" });
    }
  } catch (err) {
    console.log("there was an error ", err);
    res.status(500).send({ err: "error fetching or inserting track" });
  }
});

//get track by isrc
app.get("/api/tracks/:isrc", async (req, res) => {
  const isrc = req.params.isrc;

  try {
    const track = await Track.findOne({ where: { isrc } });
    if (track === null) {
      res.status(404).send({});
    } else {
      res.status(200).send({ ...track.dataValues });
    }
  } catch (err) {
    console.log("error retrieving track by isrc", err);
    res.status(500).send({ err: "error retrieving track" });
  }
});

//search tracks by artist
app.get("/api/tracks", async (req, res) => {
  try {
    let tracks = await sq.query(
      "select * from tracks where exists (select from unnest(artist_list) elem where elem ilike ?)",
      {
        replacements: [`%${req.query.artist}%`],
        type: QueryTypes.SELECT,
      }
    );

    if (tracks === null) {
      res.status(404).send({});
    } else {
      res.status(200).send(tracks);
    }
  } catch (err) {
    console.log("error retrieving track by artist name", err);
    res.status(500).send({ err: "error retrieving track" });
  }
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

//function to insert or update if track already exists
function upsert(values, condition) {
  return Track.findOne({ where: condition }).then(function (obj) {
    // update
    if (obj) return obj.update(values);
    // insert
    return Track.create(values);
  });
}
