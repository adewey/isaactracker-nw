'use strict';

var items = require('./libs/items'),
    players = require('./libs/players'),
    stages = require('./libs/stages'),
    achievements = require('./libs/achievements');

var isaac_tracker = require('isaac-log-tracker');
var socket_io = require('socket.io')(27462);

var active_touches = [];
var transformations = {};

socket_io.on('connection', function() {
    isaac_tracker.start();
});

isaac_tracker.on('seedEvent', function(raw, seed) {
    /* newGame: information pertaining to the new game
       input:
       {
           seed: integer,
       }
       output:
       {
           seed: string (example: ASDF JKLX)
       }
    */
    active_touches = [];
    transformations = {};
    socket_io.emit('newGame', seed);
});

isaac_tracker.on('playerEvent', function (raw, player_id) {
    /* updatePlayer: current character data object
       input:
       {
           player_id: integer (from players.xml)
       }
       output:
       {
           player: {
               name: string,
               id: integer,
               bigportrait: string (name of png image),
               ... other things are included like starting items, starting stats, etc. we don't use them
           }
       }
    */
    socket_io.emit('updatePlayer', players(player_id || 0));
});

isaac_tracker.on('levelEvent', function (raw, floor, stage, alternate) {
    /* updateStage: current stage data object
       input:
       {
           stage: integer,
           floor: integer
       }
       output:
       {
           stage: {
               name: string,
               id: integer,
               ... (other things are included like starting items, starting stats, etc. we don't use them
           },
           floor: integer,
       }
    */
    socket_io.emit('updateStage', stages(stage), floor);
});

isaac_tracker.on('collectibleEvent', function (raw, item_id, item_name) {
    /* touchedItem: an object of the most recently touched item based on items.xml
       input:
       {
           item_id: integer,
           item_name: string,
       }
       output:
       {
           item: {
               name: string,
               id: integer,
               description: string,
               gfx: string (name of png image),
               state: string (passive, active, familiar),
           }
       }
    */
    var item = items(item_id);
    socket_io.emit('touchedItem', item);
    
    if (item.transformation) {
        if (item.state != "active" || (item.state == "active" && active_touches[item.id] == undefined)) {
            if (item.state == "active") {
                active_touches[item.id] = active_touches[item.id] || 0;
                active_touches[item.id]++;
            }
            transformations[item.transformation] = transformations[item.transformation] || 0;
            transformations[item.transformation]++;
            if (transformations[item.transformation] <= 3) {
                socket_io.emit('updateTransformation', {'transformation': item.transformation, 'count': transformations[item.transformation]});
            }
        }
    }    
});

isaac_tracker.on('curseEvent', function (raw, curse) {
    /* updatePlayer: current character data object
       input:
       {
           curse: string
       }
       output:
       {
           curse: string
       }
    */
    socket_io.emit('updateCurse', curse);
});

isaac_tracker.on('unlockEvent', function (raw, achievement_id) {
    /* unlockEvent: achievement from achievements.xml based on achievement_id
       input:
       {
           achievement_id: integer
       }
       output:
       {
           achievement: {
               text: string (Achievement name),
               id: integer,
               gfx: string (name of png image)
           }
       }
    */
    socket_io.emit('unlockEvent', achievements(achievement_id));
});
