var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  shots: [],
  user: ''
};

var addShot = function(note){
   _state.shots =  _state.shots.concat(note);
};
var removeShot = function(index){
  _state.shots.splice(index, 1);
}



var ShotsStore = objectAssign({}, EventEmitter.prototype, {
  getState: function(){
    return _state;
  },
  getShots: function(){
    return _state.shots;
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
    case appConstants.ADD_SHOT :
      addShot(action.data);
      ShotsStore.emit(CHANGE_EVENT);
      break;

    default:
      return true
  };
  return true;
});

module.exports = ShotsStore;
