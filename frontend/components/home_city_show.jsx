var React = require('react');
var ClientActions = require('../actions/client_actions');
var HomeCityStore = require('../stores/home_city_store');
var hashHistory = require('react-router').hashHistory;

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
    this.listener.remove();
  },
  updateCurrentCity: function(){
    this.setState({homeCity: HomeCityStore.currentHomeCity()});
  },
  handleClick: function(e){
    e.preventDefault();
    console.log("clickling");
    var gymName = e.target.textContent;
    // var id = HomeCityStore.findIdOf(cityName);
    // hashHistory.push('/home_cities/' + id);
  },
  render: function() {
    var gyms = [];
    this.state.homeCity.gyms.forEach(function(gym){
      gyms.push(<li onClick={this.handleClick} key={gym.name}>{gym.name}</li>);
    }.bind(this));
    return (
      <div>
        <h2>{this.state.homeCity.name}</h2>
        <ul>{gyms}</ul>
      </div>
    );
  }

});

module.exports = HomeCityShow;
