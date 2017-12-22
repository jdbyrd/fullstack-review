const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/repos', function (req, res) {
  let username = req.body.term;
  let url = `https://api.github.com/search/repositories?q=user:${username}`
  github.getReposByUsername(url)
  .then((data) => {
    Promise.all(data.items.map(db.save))
    .then(res.json('ok'))
    .catch(res.json('ok'));
  })
});

app.get('/repos', function (req, res) {
  db.search((err, repo)=>{
    if (err) return handleError(err);
    res.json(repo);
  });
});

let port = process.env.port || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
