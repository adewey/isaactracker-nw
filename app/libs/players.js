'use strict';

var playerslist = require('./resources').players;

module.exports = function(players) {
    return playerslist[players];
};