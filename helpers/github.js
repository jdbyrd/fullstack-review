const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (giturl) => {
  let options = {
    url: giturl,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  let callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      db.save(info);
    }
  };
  request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;