var url = require('url');
var path = require('path');
module.exports = function(config) {
  var urlMaker = require('./url')(config);
  var tagMaker = require('./tag');
  var catMaker = require('./category');
  return function(post, isSummary) {
    return {
      id: post._id,
      tags: post.tags.data.map(function(tag) {
        return tagMaker(config)(tag, false);
      }),
      categories: post.categories.data.map(function(cat) {
        return catMaker(config)(cat, false);
      }),
      url: path.join(urlMaker.posts, post.path.slice(0, -1) + '.json'),
      date: post.date._i,
      title: post.title,
      permalink: post.permalink,
      content: isSummary ? post.excerpt : post.content
    };
  };
};