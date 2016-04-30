var React = require('react');

var WorkoutInfo = React.createClass({
  parseTime: function(str){
    if (str.length > 3) {
      return (str.split("T")[1].slice(0,8));
    } else {
      return str;
    }
  },
  getInitialState: function() {
    var time = this.parseTime(this.props.info.time);
    return {
      name: this.props.info.name,
      date: this.props.info.date,
      time: time
    };
  },
  handleChange: function(type){
    return function(e){
      var updateAttrs = {};
      updateAttrs[type] = e.target.value;
      this.setState(updateAttrs);
      this.props.updateWorkout(updateAttrs);
    }.bind(this);
  },
  render: function(){
    return (
      <div className="workout-info">
        <label>
          Workout Name: <input
            type='text'
            value={this.state.name}
            onChange={this.handleChange("name")}/>
        </label>
        <label>
          Date: <input
            type='date'
            value={this.state.date}
            onChange={this.handleChange("date")}/>
        </label>
        <label>
          Time: <input
            type='time'
            value={this.state.time}
            onChange={this.handleChange("time")}/>
        </label>
      </div>
    );
  }
});

module.exports = WorkoutInfo;
