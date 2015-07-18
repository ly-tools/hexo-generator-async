var url = require('url');
var path = require('path');
module.exports = function(config) {
  var urlMaker = require('./url')(config);
  var tagMaker = require('./tag');
  var catMaker = require('./category');
  return function(post, isSummary) {
    var date = new Date(post.date);
    return {
      tags: post.tags.data.map(function(tag) {
        return tagMaker(config)(tag, false);
      }),
      categories: post.categories.data.map(function(cat) {
        return catMaker(config)(cat, false);
      }),
      url: path.join(urlMaker.posts, post.path.slice(0, -1) + '.json'),
      date: date.getTime(),
      path: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        name: post.slug
      },
      subtitle: post.subtitle,
      title: post.title,
      permalink: post.permalink,
      content: isSummary ? post.excerpt : post.content
    };
  };
};
