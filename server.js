const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compare = require('./compare');
const backendInput = require('./backend-input');

let port = process.env.PORT || 3000;

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Chemtest');
console.log('Connected');

let inputObj;

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log(req.body);
    inputObj = req.body;
    let f = compare(inputObj);
    backendInput.func(inputObj, f);
    console.log(f);
    res.send({ result: f });
});

app.listen(port, () => {
    console.log(`running on port ${port}`);
});

module.exports = {
    inputObj
};
