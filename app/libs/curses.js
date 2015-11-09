'use strict';

var curselist = require('./resources').curses;

module.exports = function(curse_id) {
    return curselist[curse_id];
};