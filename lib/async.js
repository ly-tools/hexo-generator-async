'use strict';
var path = require('path');
var stringify = require('json-stringify-safe');
var genPosts = require('./posts');
var genTags = require('./tags');
var genCategories = require('./categories');
var genLists = require('./lists');

var data = [];

module.exports = function(locals) {
    var posts = locals.posts.sort('-date').toArray();
    var tags = locals.tags;
    var categories = locals.categories;
    var config = this.config.async_generator;
    [].push.apply(data, genPosts(posts, config));
    [].push.apply(data, genTags(tags, config));
    [].push.apply(data, genCategories(categories, config));
    [].push.apply(data, genLists(posts, config));
    data = data.map(function(item){
    	item.data = stringify(item.data);
    	return item;
    });
    return data;
};