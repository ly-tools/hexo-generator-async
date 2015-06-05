var url = require('url');
var path = require('path');
module.exports = function(post, config, isSummary) {
  return {
    id: post._id,
    tags: post.tags.data.map(function(tag) {
      return require('./tag')(tag, config, false);
    }),
    categories: post.categories.data.map(function(cat) {
      return require('./category')(cat, config, false);
    }),
    url: path.join(config.base, 'posts', post.path.slice(0, -1) + '.json'),
    date: post.date._i,
    title: post.title,
    permalink: post.permalink,
    content: isSummary ? post.excerpt : post.content
  };
};