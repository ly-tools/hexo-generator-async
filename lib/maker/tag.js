var url = require('url');
var path = require('path');
module.exports = function(config) {
  var urlMaker = require('./url')(config);
  var postMaker = require('./post');
  return function(tag, needPosts) {
    var result = {
      name: tag.name,
      permalink: tag.permalink,
      url: path.join(urlMaker.tags, tag.name + '.json'),
      count: tag.posts.data.length
    };
    if (needPosts) result.posts = tag.posts.data.map(function(post) {
      return postMaker(config)(post, true);
    });
    return result;
  };
};