var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/firebaseUtils');
 
var MeActions = {
  updateMe: function(me){
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE_ME,
      data: me
    }); 
    //firebaseUtils.addNote(noteObj);
  }
};

module.exports = MeActions;