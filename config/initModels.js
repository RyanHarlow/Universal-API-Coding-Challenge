const Track = require("../models/track");

function initModels(){
    Track.sync().then(() => {
      console.log("Track Synced");
    });
}

module.exports = {initModels};