var path = require('path');
module.exports = function(config) {
  var makePost = require('./maker/post')(config);
  var pagination = require('./tool/pagination')(config);
  var makeUrl = require('./maker/url')(config);
  return function(posts) {
    var archives = {};
    posts.forEach(function(post) {
      var date = new Date(post.date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      archives[year] = archives[year] || {};
      archives[year][month] = archives[year][month] || [];
      archives[year][month].push(post);
    });
    var result = [];
    for (var year in archives)
      for (var month in archives[year])[].push.apply(result, pagination({
        path: path.join(makeUrl.archives, year, month, 'list.json'),
        data: {
          posts: archives[year][month].map(function(post) {
            return makePost(post, config, true);
          })
        }
      }));
    return result;
  };
};