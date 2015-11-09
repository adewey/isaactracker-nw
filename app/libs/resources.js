'use strict';
 
var parser = require('node-xml-lite');

var itemsFile = parser.parseFileSync('./resources/items.xml');
var playersFile = parser.parseFileSync('./resources/players.xml');
var stagesFile = parser.parseFileSync('./resources/stages.xml');
var achievementsFile = parser.parseFileSync('./resources/achievements.xml');
var cursesFile = parser.parseFileSync('./resources/curses.xml');

var resources = {
    items: [],
    players: [],
    stages: [],
    achievements: [],
    curses: [],
};

//todo(dither): implement other transformations
var angel_list = ['33', '72', '101', '156', '185', '313'],
    baby_list = ['8', '67', '100', '167', '268', '269', '322'],
    bob_list = ['42', '140', '149', '273'],
    drugs_list = ['13', '14', '70', '143', '240', '345'],
    evilangel_list = ['51', '79', '80', '82', '83', '118', '159', '230', '399'],
    guppy_list = ['81', '133', '134', '145', '187', '212'],
    lordoftheflies_list = ['9', '10', '57', '128', '148', '151', '248', '264', '272', '274', '279', '320'],
    mom_list = ['29',  '30', '31', '39', '41', '55', '102', '110', '114', '139', '195', '199', '200', '217', '228', '355'],
    mushroom_list = ['11', '12', '71', '120', '121', '342', '398'],
    poop_list = ['36', '209', '236', '291', '378'],
    superbum_list = ['114', '278', '388'];

var items = itemsFile.childs;
for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item['name'] == 'trinket')
        continue;
    item['attrib']['state'] = item['name'];
    if (angel_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['transformation'] = 'angel';
    if (baby_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['transformation'] = 'baby';
    if (drugs_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['transformation'] = 'drugs';
    if (evilangel_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['transformation'] = 'evilangel';
    if (guppy_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['transformation'] = 'guppy';
    if (lordoftheflies_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['transformation'] = 'lordoftheflies';
    if (mom_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['transformation'] = 'mom';
    if (mushroom_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['transformation'] = 'mushroom';
    if (poop_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['transformation'] = 'poop';
    if (superbum_list.indexOf(item['attrib']['id']) != -1)
        item['attrib']['transformation'] = 'superbum';
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

var curses = cursesFile.childs;
for (var i = 0; i < curses.length; i++) {
    var curse = curses[i];
    resources.curses[curse['attrib']['id']] = curse['attrib'];
}

var achievements = achievementsFile.childs;
for (var i = 0; i < stages.length; i++) {
    var achievement = achievements[i];
    if (achievement['attrib']['gfx'])
        achievement['attrib']['gfx'] = achievement['attrib']['gfx'].toLowerCase()
    resources.achievements[achievement['attrib']['id']] = achievement['attrib'];
}

module.exports = resources;