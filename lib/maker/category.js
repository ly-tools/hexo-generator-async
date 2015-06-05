var url = require('url');
module.exports = function(category, config, needPosts) {
	var result = {
		id: category._id,
    name: category.name,
    permalink: category.permalink,
    url: url.resolve(config.url, 'async/categories/' + category.name + '.json')
	};
	if(needPosts) result.posts = category.posts.data.map(function(post) {
      return require('./post')(post, config)
    });
  return result;
};