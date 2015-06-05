var url = require('url');
var path = require('path');
module.exports = function(tag, config, needPosts) {
  var result = {
    id: tag._id,
    name: tag.name,
    permalink: tag.permalink,
    url: path.join(config.base, 'tags', tag.name + '.json')
  };
  if (needPosts) result.posts = tag.posts.data.map(function(post) {
    return require('./post')(post, config, true)
  });
  return result;
};