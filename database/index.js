const mongoose = require('mongoose');
mongoose.connect('mongodb://pete:pete@ds157653.mlab.com:57653/petey');

let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  url: String,
  size: Number,
  watchers: Number,
  repoid: {type: Number, unique: true}
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (value) => {
  return new Promise((resolve, reject) => {
    let newModel = new Repo({name: value.name, owner: value.owner.login, url: value.html_url, size: value.size, watchers: value.watchers, repoid: value.id});
    newModel.save(function (err, newModel) {
      if (err){ 
        console.log(err);
        reject(err);
      }else{
        resolve('success');
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