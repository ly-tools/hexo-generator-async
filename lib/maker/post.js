var url = require('url');
var path = require('path');
module.exports = function(config) {
  var makeUrl = require('./url')(config);
  return function(post, isSummary) {
    return {
      id: post._id,
      tags: post.tags.data.map(function(tag) {
        return require('./tag')(config)(tag, false);
      }),
      categories: post.categories.data.map(function(cat) {
        return require('./category')(config)(cat, false);
      }),
      url: path.join(makeUrl.posts, post.path.slice(0, -1) + '.json'),
      date: post.date._i,
      title: post.title,
      permalink: post.permalink,
      content: isSummary ? post.excerpt : post.content
    };
  };
};