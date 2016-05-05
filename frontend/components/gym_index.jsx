var React = require('react');
var GymStore = require('../stores/home_city_store');
var hashHistory = require('react-router').hashHistory;
var Map = require('./map');



var GymIndex = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    var id = e.currentTarget.value;
    hashHistory.push('/gyms/' + id);
  },
  render: function() {
    var gyms = [];
    this.props.gyms.forEach(function(gym){
      gyms.push(<li
        onClick={this.handleClick}
        key={gym.name}
        value={gym.id}
        className="gym-each"
      >
      <img src={gym.logo_url} className="gym-logo" />
      <div>
        <span>{gym.name}</span>
        <p>{gym.address}</p>
      </div>
      </li>);
    }.bind(this));
    return (
      <div className="gym-index-pane">
        <ul className="gym-index">
          {gyms}
        </ul>
        <Map
          gyms={this.props.gyms}
          cityName={this.props.cityName}/>
      </div>
    );
  }

});

module.exports = GymIndex;
