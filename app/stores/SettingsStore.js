var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  barriers: [{x:3,y:3},{x:4,y:3},{x:5,y:3},{x:6,y:3},{x:25,y:6},{x:25,y:7},{x:25,y:8},{x:25,y:9},{x:25,y:10},{x:25,y:11},
                {x:9,y:10},{x:9,y:11},{x:9,y:12},{x:9,y:13},{x:9,y:14},{x:9,y:15},{x:9,y:16},{x:6,y:16},{x:7,y:16},{x:8,y:16},{x:10,y:16},{x:11,y:16},{x:12,y:16},
                {x:15,y:5},{x:16,y:5},{x:17,y:5},{x:18,y:5}],
  keys: {
                left:97,
                top:119,
                right:100,
                bottom:115,
                shoot: 32
            },
  sizes: {
                x: 28-1,
                y: 20-1,
                one: 30
            }
};

var SettingsStore  = objectAssign({}, EventEmitter.prototype, {
  getState: function(){
    return _state;
  },
  getBarriers: function(){
    return _state.barriers;
  },
  getKeys: function(){
    return _state.keys;
  },
  getSizes: function(){
    return _state.sizes;
  },
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  }
});

/*AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ENEMY:
      addEnemy(action.data);
      console.log('vložen enemy ve storu',action.data);
      EnemiesStore.emit(CHANGE_EVENT);
      break;
    case appConstants.REMOVE_ENEMY:
      removeEnemy(action.data);
      console.log('odebrán enemy ve storu',action.data);
      EnemiesStore.emit(CHANGE_EVENT);
      break;

    default:
      return true
  };
  return true;
});*/

module.exports = SettingsStore;
