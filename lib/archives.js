var path = require('path');
module.exports = function(config) {
  var postMaker = require('./maker/post')(config);
  var urlMaker = require('./maker/url')(config);
  var pagination = require('./tool/pagination')(config);
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
        path: path.join(urlMaker.archives, year, month, 'list.json'),
        data: {
          posts: archives[year][month].map(function(post) {
            return postMaker(post, true);
          })
        }
      }));
    return result;
  };
};