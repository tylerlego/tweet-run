import React, { Component } from 'react';
import moment from 'moment';

export default class TweetRun extends Component {
    render(props) {
      let numTimesString = '';
      if (this.props.data.tweets.length > 0) {
        let times = this.props.data.tweets.length
        numTimesString = 'Donald Trump tweeted ' + times + ' times!';
      }
      return (
        <div className="card">
          <h5 className="card-header">{this.props.data.name}</h5>
          <div className="card-body">
            <h5 className="card-title">{moment(this.props.data.start_date).format('MMMM Do YYYY')}</h5>
            <p>{moment(this.props.data.start_date).format('h:mm a')} - {moment(this.props.data.end_date).format('h:mm a')}</p>
            <p className="card-text">{numTimesString}</p>
            <button className="btn btn-primary">Go somewhere</button>
          </div>
        </div>
      )
    }
  }