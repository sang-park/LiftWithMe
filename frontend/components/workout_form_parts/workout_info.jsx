var React = require('react');

var WorkoutInfo = React.createClass({
  parseTime: function(str){
    if (str.length > 3) {
      return (str.split("T")[1].slice(0,8));
    } else {
      return "12:00";
    }
  },
  parseDate: function(date){
    if (date) {
      return date;
    } else {
      var d = new Date();
      var yr = d.getYear() + 1900;
      var month = d.getMonth() + 1;
      var day = d.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return ([yr,month,day].join("-"));
    }
  },
  getInitialState: function() {
    var time = this.parseTime(this.props.info.time);
    var date = this.parseDate(this.props.info.date);
    return {
      name: this.props.info.name,
      date: date,
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
            placeholder="Time"
            value={this.state.time}
            onChange={this.handleChange("time")}/>
        </label>
      </div>
    );
  }
});

module.exports = WorkoutInfo;
