'use strict';

var stageslist = require('./resources').stages;

module.exports = function(stage) {
    return stageslist[stage];
};