'use strict';

var achievementlist = require('./resources').achievements;

module.exports = function(achievement) {
    return achievementlist[achievement];
};