'use strict';

var items = require('./libs/items'),
    players = require('./libs/players'),
    stages = require('./libs/stages'),
    achievements = require('./libs/achievements');

var isaac_tracker = require('isaac-log-tracker');
var socket_io = require('socket.io')(27462);

var guppy_touches = 0,
    lof_touches = 0;

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
    guppy_touches = 0;
    socket_io.emit('updateGuppy', guppy_touches);
    lof_touches = 0;
    socket_io.emit('updateLoF', lof_touches);
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
    
    if (item.guppy && guppy_touches < 3) {
        guppy_touches++;
        socket_io.emit('updateGuppy', guppy_touches);
    }
    
    if (item.lof && lof_touches < 3) {
        lof_touches++;
        socket_io.emit('updateLoF', lof_touches);
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
