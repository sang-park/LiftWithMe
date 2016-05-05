var React = require('react');
var ClientActions = require('../actions/client_actions');
var HomeCityStore = require('../stores/home_city_store');
var hashHistory = require('react-router').hashHistory;
var img_URLs = {
  "San Francisco" : "http://res.cloudinary.com/dque3vywj/image/upload/v1462427553/San_Francisco_c9izct.jpg",
  "New York" : "http://res.cloudinary.com/dque3vywj/image/upload/v1462427553/New_York_znvcdo.jpg",
  "Los Angeles" : "http://res.cloudinary.com/dque3vywj/image/upload/v1462427553/Los_Angeles_lfbneb.jpg",
  "Boston" : "http://res.cloudinary.com/dque3vywj/image/upload/v1462427551/Boston_zt9rwz.jpg"
};

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
    if (cityName === ""){
      cityName = e.currentTarget.textContent;
    }
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
          <div>
            <p>{city.name}</p>
          </div>
        </li>);
    }.bind(this));

    return (
      <div className="home-cities-full-page">
        <h2>Pick Your City:</h2>
        <ul className="home-city-index">{cities}</ul>
      </div>
    );
  }

});

module.exports = HomeCityIndex;
