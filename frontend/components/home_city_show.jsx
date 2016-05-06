var React = require('react');
var ClientActions = require('../actions/client_actions');
var HomeCityStore = require('../stores/home_city_store');
var hashHistory = require('react-router').hashHistory;
var GymIndex = require('./gym_index');

var HomeCityShow = React.createClass({
  getInitialState: function() {
    return { homeCity: {gyms: []}};
  },
  componentDidMount: function() {
    this.listener = HomeCityStore.addListener(this.updateCurrentCity);
    var url = "/api/home_cities/" + this.props.params.home_city_id;
    ClientActions.fetchOne({
      url: url,
      type: "CURRENT_CITY"
    });
  },
  componentWillUnmount: function() {
    if (this.listener) {
      this.listener.remove();
    }
  },
  updateCurrentCity: function(){
    this.setState({homeCity: HomeCityStore.currentHomeCity()});
  },

  render: function() {
    return (
      <div>
        <h2>{this.state.homeCity.name}</h2>
        <GymIndex
          gyms={this.state.homeCity.gyms}
          cityName={this.state.homeCity.name} />
      </div>
    );
  }

});

module.exports = HomeCityShow;
