var path = require('path');
var stringify = require('json-stringify-safe');
var _ = require('lodash');

var defaultWhitelist = [
  'title',
  'subtitle',
  'description',
  'author',
  'url',
  'email'
];

module.exports = function(locals) {
  var config = this.config.async_generator;
  var generators = [{
    fn: require('./posts')(config),
    type: 'posts'
  }, {
    fn: require('./tags')(config),
    type: 'tags'
  }, {
    fn: require('./categories')(config),
    type: 'categories'
  }, {
    fn: require('./lists')(config),
    type: 'posts'
  }, {
    fn: require('./config')(config),
    type: 'config'
  }, {
    fn: require('./archives')(config),
    type: 'posts'
  }];
  var sources = {
    posts: locals.posts.sort('-date').toArray(),
    tags: locals.tags,
    categories: locals.categories,
    config: {
      global: _.pick(this.config, this.config.async_generator.whitelist || defaultWhitelist),
      theme: this.theme.config
    }
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
