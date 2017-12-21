const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');
const github = require('../helpers/github');


let getReposByUsername = (giturl) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: giturl,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${config.TOKEN}`
      }
    };
    request(options, (error, response, body) => {
      if(error) {
        reject(error);
      }else if(response) {
        var info = JSON.parse(body);
        resolve(info);
      }
    });
  })
}

module.exports.getReposByUsername = getReposByUsername;