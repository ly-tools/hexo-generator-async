var makePost = require('./maker/post');
var path = require('path');
var pagination = require('./tool/pagination');
module.exports = function(posts, config) {
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
    for (var month in archives[year])
      [].push.apply(result, pagination({
        path: path.join(config.base, 'archives', year, month, 'list.json'),
        data: {
          posts: archives[year][month].map(function(post) {
            return makePost(post, config, true);
          })
        }
      }, config.perPage));
  return result;
};