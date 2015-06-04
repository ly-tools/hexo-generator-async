'use strict';
var path = require('path');
var genPosts = require('./posts');
var genTags = require('./tags');
var genCategories = require('./categories');

var data = [];

module.exports = function(locals) {
    var posts = locals.posts.sort('-date').toArray();
    var config = this.config;
    [].push.apply(data, genPosts(posts, config));
    [].push.apply(data, genTags(locals.tags, config));
    [].push.apply(data, genCategories(locals.categories, config));
    return data;
};