var cors = require('cors')({origin: true});
var firebase = require('firebase');
const admin = require("firebase-admin");
var functions = require('firebase-functions');
var express = require('express');
const fetch = require('node-fetch');
var http = require('http');
var https = require('https');
const axios = require('axios');

var app = express();

app.get("/schemaOrg/:name", (req, res, next) => {

  const url = "https://schema.org/"+req.params.name;

  cors(req, res, () => {
    axios(url)
    .then(response =>{
      const html = response.data;
      console.log(html);
      res.send(html)
    })
    .catch(console.error);

  })//cors

})

exports.app = functions.https.onRequest(app);