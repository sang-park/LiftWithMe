var React = require('react');
var ClientActions = require('../actions/client_actions');
var HomeCityStore = require('../stores/home_city_store');

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
  updateHomeCities: function(){
    this.setState({homeCities: HomeCityStore.all()});
  },
  render: function() {
    var cities = [];
    this.state.homeCities.forEach(function(city){
      cities.push(<li key={city.name}>{city.name}</li>);
    });
    return (
      <div>
        <h2>Home Cities:</h2>
        <ul>{cities}</ul>
      </div>
    );
  }

});

module.exports = HomeCityIndex;
