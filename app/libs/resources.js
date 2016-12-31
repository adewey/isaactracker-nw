'use strict';
 
var parser = require('node-xml-lite');

var itemsFile = parser.parseFileSync('./resources/items.xml');
var playersFile = parser.parseFileSync('./resources/players.xml');
var stagesFile = parser.parseFileSync('./resources/stages.xml');
var cursesFile = parser.parseFileSync('./resources/curses.xml');
var bossesFile = parser.parseFileSync('./resources/bossportraits.xml');

var resources = {
    items: [],
    players: [],
    stages: [],
    curses: [],
    bosses: [],
};

var angel_list = [33, 72, 101, 156, 185, 313],
    baby_list = [8, 67, 100, 167, 268, 269, 322],
    bob_list = [42, 140, 149, 273],
    drugs_list = [13, 14, 70, 143, 240, 345],
    evilangel_list = [51, 79, 80, 82, 83, 118, 159, 230, 399],
    guppy_list = [81, 133, 134, 145, 187, 212],
    lordoftheflies_list = [9, 10, 57, 128, 148, 151, 248, 264, 272, 274, 279, 320],
    mom_list = [29,  30, 31, 39, 41, 55, 102, 110, 114, 139, 195, 199, 200, 217, 228, 355],
    mushroom_list = [11, 12, 71, 120, 121, 342, 398],
    poop_list = [36, 209, 236, 291, 378],
    superbum_list = [114, 278, 388];

var items = itemsFile.childs;
for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item['name'] == 'trinket')
        continue;
    
    item['attrib']['id'] = Number(item['attrib']['id']);
    
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
    
    if (item['attrib']['gfx'])
        item['attrib']['gfx'] = item['attrib']['gfx'].toLowerCase()
    
    resources.items[item['attrib']['id']] = item['attrib'];
}
module.exports.item_from_id = function(item_id) {
    return resources.items[item_id];
};

var players = playersFile.childs;
for (var i = 0; i < players.length; i++) {
    var player = players[i];
    
    player['attrib']['id'] = Number(player['attrib']['id']);
    
    if (player['attrib']['portrait']) 
        player['attrib']['portrait'] = player['attrib']['portrait'].toLowerCase()
    
    if (player['attrib']['bigportrait'])
        player['attrib']['bigportrait'] = player['attrib']['bigportrait'].toLowerCase()
    
    resources.players[player['attrib']['id']] = player['attrib'];
}
module.exports.player_from_id = function(player_id) {
    return resources.players[player_id];
};

var stages = stagesFile.childs;
for (var i = 0; i < stages.length; i++) {
    var stage = stages[i];
    
    stage['attrib']['id'] = Number(stage['attrib']['id']);
    
    stage['attrib']['slug'] = stage['attrib']['name'].toLowerCase().replace(" ", "-");
    
    resources.stages[stage['attrib']['id']] = stage['attrib'];
}
module.exports.stage_from_id = function(stage_id) {
    return resources.stages[stage_id];
};

var curses = cursesFile.childs;
for (var i = 0; i < curses.length; i++) {
    var curse = curses[i];
    
    curse['attrib']['id'] = Number(curse['attrib']['id']);
    
    resources.curses[curse['attrib']['id']] = curse['attrib'];
}
module.exports.curse_from_id = function(curse_id) {
    return resources.curses[curse_id];
};

var bosses = bossesFile.childs;
for (var i = 0; i < bosses.length; i++) {
    var boss = bosses[i];
    
    boss['attrib']['id'] = Number(boss['attrib']['id']);
    
    if (boss['attrib']['portrait'])
        boss['attrib']['portrait'] = boss['attrib']['portrait'].toLowerCase();
    
    boss['attrib']['slug'] = boss['attrib']['name'].toLowerCase().replace(" ", "-").replace(".", "").replace("!", "").replace("'", "").replace("???", "blue-baby");
    
    resources.bosses[boss['attrib']['id']] = boss['attrib'];
}
module.exports.boss_from_id = function(boss_id) {
    return resources.bosses[boss_id];
};
