var AppDispatcher = require('../dispatcher/dispatcher');

var ServerActions = {
  receiveAll: function(index, type){
    AppDispatcher.dispatch({
      actionType: type,
      index: index
    });
  }
};

module.exports = ServerActions;
