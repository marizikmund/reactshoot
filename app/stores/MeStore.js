var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  me: {},
  myDeaths: 0,
  myPoints: 0
};

var updateMe = function(me) {
	_state.me=me;
}



var MeStore  = objectAssign({}, EventEmitter.prototype, {
  getState: function(){
    return _state;
  }, 
  getMe: function(){
    return _state.me;
  },
  getMyDeaths: function(){
    return _state.myDeaths;
  },
  getMyPoints: function(){
    return _state.myPoints;
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
    case appConstants.UPDATE_ME:
    if(typeof action.data !== 'object') {} else {
    	 updateMe(action.data);
      MeStore.emit(CHANGE_EVENT);
    }
     
      break;
     
    
    default:
      return true
  };
  return true;
});

module.exports = MeStore;
