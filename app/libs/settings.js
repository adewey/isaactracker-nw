'use strict';

var fs = require('fs-extra');

module.exports = new function() {
    var self = this,
        settings_file = global.dataPath + "/settings.json";

    try {
        self.settings = fs.readJSONFileSync(settings_file);
    }
    catch(e) {
        console.log(e);
        self.settings = {
            'upload_data': false,
            'isaactracker_key': '',
            'display_spacebar_items': false,
        };
    }

    self.get = function(setting) {
        if (!setting) {
            return self.settings;
        }
        return self.settings[setting];
    };
    
    self.set = function(setting, value) {
        self.settings[setting] = value;
    };
    
    self.save = function() {
        fs.writeJSONFileSync(settings_file, self.settings);
    };
    
    return self;
};
