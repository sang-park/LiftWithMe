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
  }
};

module.exports = ServerActions;
