'use strict';
 
var parser = require("node-xml-lite");

var itemsFile = parser.parseFileSync('./resources/items.xml');
var playersFile = parser.parseFileSync('./resources/players.xml');
var stagesFile = parser.parseFileSync('./resources/stages.xml');
var achievementsFile = parser.parseFileSync('./resources/achievements.xml');

var resources = {items:[],players:[],stages:[], achievements:[]};

var guppy_list = ["81", "133", "134", "145", "187", "212"],
    lof_list = ["9", "10", "57", "128", "148", "151", "248", "264", "272", "274", "279", "320"];
    
var items = itemsFile.childs;
for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item['name'] == 'trinket')
        continue;
    item['attrib']['state'] = item['name'];
    if (guppy_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['guppy'] = true;
    if (lof_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['lof'] = true;
    resources.items[item['attrib']['id']] = item['attrib'];
}

var players = playersFile.childs;
for (var i = 0; i < players.length; i++) {
    var player = players[i];
    if (player['attrib']['portrait']) 
        player['attrib']['portrait'] = player['attrib']['portrait'].toLowerCase()
    if (player['attrib']['bigportrait'])
        player['attrib']['bigportrait'] = player['attrib']['bigportrait'].toLowerCase()
    resources.players[player['attrib']['id']] = player['attrib'];
}

var stages = stagesFile.childs;
for (var i = 0; i < stages.length; i++) {
    var stage = stages[i];
    resources.stages[stage['attrib']['id']] = stage['attrib'];
}

var achievements = achievementsFile.childs;
for (var i = 0; i < stages.length; i++) {
    var achievement = achievements[i];
    if (achievement['attrib']['gfx'])
        achievement['attrib']['gfx'] = achievement['attrib']['gfx'].toLowerCase()
    resources.achievements[achievement['attrib']['id']] = achievement['attrib'];
}

module.exports = resources;