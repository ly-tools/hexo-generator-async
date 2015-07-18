'use strict';

var path = require('path');
var _ = require('lodash');

hexo.config.async_generator = _.assign({}, hexo.config.async_generator, {
  perPage: hexo.config.per_page || 10,
  base: (hexo.config.async_generator && hexo.config.async_generator.base) ||  path.join(path.sep, 'async', path.sep),
  url: hexo.config.url
});


hexo.extend.generator.register('async', require('./lib/async'));
