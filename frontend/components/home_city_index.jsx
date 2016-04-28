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
    if (cityName === ""){
      cityName = e.currentTarget.textContent;
    }
    var id = HomeCityStore.findIdOf(cityName);
    hashHistory.push('/home_cities/' + id);
  },
  render: function() {
    var cities = [];
    this.state.homeCities.forEach(function(city){
      var pathToImage = ("/assets/" + city.name.split(" ").join("_") + ".jpg");
      cities.push(
        <li onClick={this.handleClick}
          key={city.name}
        >
          <img src={pathToImage}/>
          <p>{city.name}</p>
        </li>);
    }.bind(this));

    return (
      <div>
        <h2>Pick Your City:</h2>
        <ul className="home-city-index">{cities}</ul>
      </div>
    );
  }

});

module.exports = HomeCityIndex;
