var url = require('url');
var path = require('path');
module.exports = function(category, config, needPosts) {
	var result = {
		id: category._id,
    name: category.name,
    permalink: category.permalink,
    url: path.join(config.base, 'categories', category.name + '.json')
	};
	if(needPosts) result.posts = category.posts.data.map(function(post) {
      return require('./post')(post, config, true)
    });
  return result;
};