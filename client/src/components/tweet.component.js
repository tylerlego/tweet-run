import React, { Component } from 'react';
import moment from 'moment';

export default class Tweet extends Component {
    render(props) {
      return (
        <div className="activity-div">
          <h3>{this.props.tweet.user_screen_name}</h3>
          <p>{moment(this.props.tweet.created_at).format('MMMM Do YYYY, h:mm a')}</p>
          <p>{this.props.tweet.text}</p>
        </div>
      )
    }
  }