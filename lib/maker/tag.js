var url = require('url');
module.exports = function(tag, config, needPosts) {
  var result = {
    id: tag._id,
    name: tag.name,
    permalink: tag.permalink,
    url: url.resolve(config.url, 'async/tags/' + tag.name + '.json')
  };
  if (needPosts) result.posts = tag.posts.data.map(function(post) {
    return require('./post')(post, config)
  });
  return result;
};