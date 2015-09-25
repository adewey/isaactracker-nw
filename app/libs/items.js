'use strict';

var itemlist = require('./resources').items;

module.exports = function(item_id) {
    return itemlist[item_id];
};