var url = require('url');
var path = require('path');
module.exports = function(config) {
  var makeUrl = require('./url')(config);
  return function(tag, needPosts) {
    var result = {
      id: tag._id,
      name: tag.name,
      permalink: tag.permalink,
      url: path.join(makeUrl.tags, tag.name + '.json')
    };
    if (needPosts) result.posts = tag.posts.data.map(function(post) {
      return require('./post')(config)(post, true);
    });
    return result;
  };
};