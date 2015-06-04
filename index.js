'use strict';

var assign = require('object-assign');
var path = require('path');

hexo.config.async = assign({
  per_page: hexo.config.per_page || 10,
  base: (hexo.config.async_generator && hexo.config.async_generator.base) ||  path.join(path.sep, 'async', path.sep)
}, hexo.config.async_generator);


hexo.extend.generator.register('async', require('./lib/async'));