var AppDispatcher = require('../dispatcher/dispatcher');

var ServerActions = {
  receiveAll: function(index, type){
    AppDispatcher.dispatch({
      actionType: type,
      index: index
    });
  },
  receiveOne: function(item, type){
    AppDispatcher.dispatch({
      actionType: type,
      item: item
    });
  },
  handleError: function(error) {
    console.log("handle errors in serveractions.js");
    // AppDispatcher.dispatch({
    //   actionType: UserConstants.ERROR,
    //   errors: error
    // });
  }

};

module.exports = ServerActions;
