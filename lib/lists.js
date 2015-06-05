var makePost = require('./maker/post');
var path = require('path');
var pagination = require('./tool/pagination');
module.exports = function(posts, config) {
  return pagination({
    path: path.join(config.base, 'lists', 'list.json'),
    data: {
      posts: posts.map(function(post) {
        return makePost(post, config, true);
      })
    }
  }, config.perPage);
};