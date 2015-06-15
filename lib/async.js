var path = require('path');
var stringify = require('json-stringify-safe');
var generators = [{
  fn: require('./posts'),
  type: 'posts'
}, {
  fn: require('./tags'),
  type: 'tags'
}, {
  fn: require('./categories'),
  type: 'categories'
}, {
  fn: require('./lists'),
  type: 'posts'
}, {
  fn: require('./config'),
  type: 'config'
}, {
  fn: require('./archives'),
  type: 'posts'
}];
module.exports = function(locals) {
  var config = this.config.async_generator;
  var sources = {
    posts: locals.posts.sort('-date').toArray(),
    tags: locals.tags,
    categories: locals.categories,
    config: config
  };
  return generators.map(function(generator) {
    return generator.fn(sources[generator.type], config).map(function(item) {
      item.data = stringify(item.data);
      return item;
    });
  }).reduce(function(prev, cur) {
    [].push.apply(prev, cur);
    return prev;
  }, []);
};