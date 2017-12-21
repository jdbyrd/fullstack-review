const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  url: String,
  size: Number,
  watchers: Number,
  repoid: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  data.items.forEach((value) => {
    Repo.find({repoid: value.id}).exec((err, results) => {
      if(results.length === 0){
        let newModel = new Repo({name: value.name, owner: value.owner.login, url: value.html_url, size: value.size, watchers: value.watchers, repoid: value.id});
        newModel.save(function (err, newModel) {
          if (err) return console.error(err);
          console.log('Added value to DB');
        });
      }
    });
  });
};

let search = (callback) => {
  Repo.
  find().
  limit(25).
  sort('-size').
  exec(callback);
};

module.exports.save = save;
module.exports.search = search;