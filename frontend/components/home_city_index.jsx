var React = require('react');
var ClientActions = require('../actions/client_actions');
var HomeCityStore = require('../stores/home_city_store');
var hashHistory = require('react-router').hashHistory;


var HomeCityIndex = React.createClass({
  getInitialState: function() {
    return { homeCities: [] };
  },
  componentDidMount: function() {
    this.listener = HomeCityStore.addListener(this.updateHomeCities);
    ClientActions.fetchAll({
      url: "/api/home_cities",
      type: "ALL_CITITES"
    });
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  updateHomeCities: function(){
    this.setState({homeCities: HomeCityStore.all()});
  },
  handleClick: function(e){
    e.preventDefault();
    var cityName = e.target.textContent;
    var id = HomeCityStore.findIdOf(cityName);
    hashHistory.push('/home_cities/' + id);
  },
  render: function() {
    var cities = [];
    this.state.homeCities.forEach(function(city){
      cities.push(
        <li onClick={this.handleClick}
          key={city.name}
        >
          {city.name}
        </li>);
    }.bind(this));
    return (
      <div>
        <h2>Home Cities:</h2>
        <ul>{cities}</ul>
      </div>
    );
  }

});

module.exports = HomeCityIndex;
