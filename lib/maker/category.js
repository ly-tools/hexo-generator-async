var url = require('url');
var path = require('path');
module.exports = function(config) {
  var makeUrl = require('./url')(config);
  return function(category, needPosts) {
    var result = {
      id: category._id,
      name: category.name,
      permalink: category.permalink,
      url: path.join(makeUrl.categories, category.name + '.json')
    };
    if (needPosts) result.posts = category.posts.data.map(function(post) {
      return require('./post')(config)(post, true);
    });
    return result;
  };
};