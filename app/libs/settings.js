'use strict';

var fs = require('fs-extra');

module.exports = new function() {
    var self = this;
    self.settings = {};
    
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
        fs.writeJSONFileSync(self.dataPath, self.settings);
    };
    
    self.init = function(dataPath) {
        self.dataPath = dataPath + "/settings.json";
        try {
            self.settings = fs.readJSONFileSync(self.dataPath);
            /* if for some reason version gets set in the settings file, ignore it completely. */
            if (self.settings.version) {
                delete self.settings.version;
            }
        }
        catch(e) {
            console.log(e);
            self.settings = {
                'upload_data': false,
                'isaactracker_key': '',
                'display_spacebar_items': false,
                'check_for_updates': true,
                'automatically_update': false,
            };
        }
        return self;
    };
    return self;
};
