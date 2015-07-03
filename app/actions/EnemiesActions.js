var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/firebaseUtils');

var EnemiesActions = {
  addEnemy: function(noteObj){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ENEMY,
      data: noteObj
    });
    //firebaseUtils.addNote(noteObj);
  },
  removeEnemy: function(index){
    //alert('2');
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ENEMY,
      data: index
    });
    //firebaseUtils.addNote(noteObj);
  },
  updateEnemy: function(snapshot){
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE_ENEMY,
      data: snapshot
    });
    //firebaseUtils.addNote(noteObj);
  },
  changeUser: function(username){
    firebaseUtils.homeInstance().child(username).on('value', function(snapshot){
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_USER,
        data: {
          user: username,
          notes: firebaseUtils.toArray(snapshot.val())
        }
      });
    });
  } 
};

module.exports = EnemiesActions;