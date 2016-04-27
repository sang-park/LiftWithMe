var React = require('react');
var GymStore = require('../stores/home_city_store');
var hashHistory = require('react-router').hashHistory;

var GymIndex = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    var id = e.target.value;
    hashHistory.push('/gyms/' + id);
  },
  render: function() {
    var gyms = [];
    this.props.gyms.forEach(function(gym){
      gyms.push(<li
        onClick={this.handleClick}
        key={gym.name}
        value={gym.id}
      >{gym.name}</li>);
    }.bind(this));
    return (
      <ul>{gyms}</ul>
    );
  }

});

module.exports = GymIndex;
