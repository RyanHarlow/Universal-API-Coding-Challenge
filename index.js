const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000;

const db = require('./db')

db.init();

app.get('/', (req,res) => {
    res.send("hello world")
})


app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});