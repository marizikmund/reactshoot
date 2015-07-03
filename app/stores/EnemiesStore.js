var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  enemies: [],
  user: ''
};

var addEnemy = function(enemy){
  _state.enemies.push(enemy);
};

var removeEnemy = function(nickname){
    _state.enemies = _state.enemies.filter(function(enemy,id) {
      if(nickname==enemy.nickname) {
          return false;
      } else {return true;}
  });
}
var updateEnemy=function(childSnapshot) {
	_state.enemies = _state.enemies.map(function(enemy,id) {
     if(childSnapshot.nickname==enemy.nickname) {
        return {nickname: childSnapshot.nickname};} else {return enemy;} //,x: childSnapshot.val().x,y: childSnapshot.val().y,direction: childSnapshot.val().direction, points: childSnapshot.val().points, deaths: childSnapshot.val().deaths};

  });
}


var EnemiesStore  = objectAssign({}, EventEmitter.prototype, {
  getState: function(){
    return _state;
  },
  getEnemies: function(){
    return _state.enemies;
  },
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
  	case appConstants.REMOVE_ENEMY:
      removeEnemy(action.data);
      EnemiesStore.emit(CHANGE_EVENT);
      break;

    case appConstants.ADD_ENEMY:
      addEnemy(action.data);
      EnemiesStore.emit(CHANGE_EVENT);
      break;

    case appConstants.UPDATE_ENEMY:
      updateEnemy(action.data);
      EnemiesStore.emit(CHANGE_EVENT);
      break;

    default:
      return true
  };
  return true;
});

module.exports = EnemiesStore;
