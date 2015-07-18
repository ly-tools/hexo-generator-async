var url = require('url');
var path = require('path');
module.exports = function(config) {
  var urlMaker = require('./url')(config);
  var postMaker = require('./post');
  return function(category, needPosts) {
    var result = {
      name: category.name,
      permalink: category.permalink,
      url: path.join(urlMaker.categories, category.name + '.json'),
      count: category.posts.data.length
    };
    if (needPosts) result.posts = category.posts.data.map(function(post) {
      return postMaker(config)(post, true);
    });
    return result;
  };
};