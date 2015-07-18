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
    var summary = [];
    for (var year in archives)
      for (var month in archives[year]) {
        summary.push({
          year: year,
          month: month,
          count: archives[year][month].length,
          permalink: path.join(config.url, 'archives', year, month),
          url: path.join(urlMaker.archives, year, month, 'list.json')
        });
        [].push.apply(result, pagination({
          path: path.join(urlMaker.archives, year, month, 'list.json'),
          data: {
            year: year,
            month: month,
            permalink: path.join(config.url, 'archives', year, month),
            posts: archives[year][month].map(function(post) {
              return postMaker(post, true);
            })
          }
        }));
      }
    result.push({
      path: path.join(config.base, 'archives.json'),
      data: summary
    });
    return result;
  };
};