const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const https = require("https");
const fs = require("fs");

const app = express();
const port = 3000;
const clientID = "627305482774414";
const clientSecret = "5c17dd6f60be20b5191ef6815c99763f";
const redirectURI = "https://localhost:3000/callback";
const mainAccessToken =
  "IGQWRNVUhJOTNxdFk5N29pWS0wcEdKWGx2Q3FJS3VFTmtGMXlhNjBELXY2YVZAOdkl2cTlYWDF6MF9XcTFucEpURkdiX3dKOG1HUGVSRlM4dGdFRjZAhWkIyUGo0cnpXb3U3cG1HZAkFvY2tKa19XRWFnYTBJcUJaYlEZD";
const userId = 6393712277381881;
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
};
app.get("/get", (req, res) => {
  // const authURL = `https://api.instagram.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user_profile,user_media&response_type=code`;

  const authURL = `https://api.instagram.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=user_profile`;

  res.redirect(authURL);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  console.log(code);

  const tokenURL = "https://api.instagram.com/oauth/access_token";

  const body = JSON.stringify({
    client_id: clientID,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectURI,
    code: code,
  });
  fetch(tokenURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((data) => {
      console.log(data, "-----------data--------------");
    })
    .catch((err) => {
      console.log(err, "-------err--------");
    });
  // const response = await axios.post(tokenURL, {
  //   client_id: 1002902184029874,
  //   client_secret: clientSecret,
  //   grant_type: "authorization_code",
  //   redirect_uri: redirectURI,
  //   code: code,
  // });

  // const userAccessToken = response.data.access_token;
  // console.log(userAccessToken, "-----------------------------------------");
  // Store or use the userAccessToken for making API requests
});

app.get("/getUserId", async (req, res) => {
  const accessToken =
    "EABSZBqVjMljYBO0hzDGEaMuRePaTqauUXViEYOVQkpoj8ClZBrVoMpyEmDZCTuwHAFNVfQoKCvVTUnKFkTWAcJDqJbdDyTPdqjDJehbK0cfhGXamG9aqgsFjszD8dZBJO4ZCNHQ6sxTgXbiE2Q6XJMYki7yCZCgX8dqwHS1aWjWAHab80KeW6QdNZAoVcUdlZCU1mTZC270zqZCMJKLy8ZAzm5k7u1TaJBa";
  fetch(
    `https://graph.instagram.com/me?fields=id,username,media_count&access_token=${accessToken}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request failed.");
      }
    })
    .then((data) => {
      const userId = data.id;
      console.log("Instagram User ID:", data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/getUserDetails", async (req, res) => {
  const accessToken =
    "IGQVJYZA3Nrci1nSUFUbWkzTlRrS1J3Y1RTUzNCZAXB1ZAHh5Y2tKUzNGQk1UY3JXUVU2MWs2Y1RpcW9Tb1ZArdk9DM2otUHhPS25wUWhGUXNTRW91cU90T1A0NVBBLVZA6SWNzMjZAra3ktV01VWWp5WU9LaQZDZD";
  const userid = "6393712277381881";
  fetch(
    `https://graph.facebook.com/v3.2/${userid}?fields=business_discovery.username(bluebottle){followers_count,media_count}&access_token=${accessToken}`
  )
    .then((data) => {
      const userId = data.id;
      console.log("Instagram User ID:", data);
    })
    .catch((error) => {
      console.error(error);
    });
});

var server = https.createServer(options, app).listen(port, function () {
  console.log("Express server listening on port " + port);
});
