const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Track = sq.define("track", {
  isrc: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  spotify_image_uri: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  artist_list: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
});

module.exports = Track;
