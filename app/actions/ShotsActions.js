var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/firebaseUtils');

var ShotsActions = {
  addShot: function(noteObj){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_SHOT,
      data: noteObj
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

module.exports = ShotsActions;