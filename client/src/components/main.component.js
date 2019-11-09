import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import TweetRun from './tweet-run.component';
import GettingActivities from './getting-activities.component';
import ActivitiesFailed from './activities-failed.component';
import ActivityList from './activity-list.component';
import moment from 'moment-timezone';

export default class Main extends Component {
  constructor(props) {
    super(props);
    
    this.getAuth = this.getAuth.bind(this);
    this.getAndSetActivities = this.getAndSetActivities.bind(this);
    this.getAndSetTweets = this.getAndSetTweets.bind(this);
    this.setTweetsInActivities = this.setTweetsInActivities.bind(this);
    this.inRange = this.inRange.bind(this);

    this.state = {
      activities: [],
      activities_failed: false,
      tweets: [],
      tweets_loaded: false
    };
  }

  componentDidMount() {
    let data = querystring.parse(window.location.search);
    let token = data['?t']; 

    if (!token) {
      this.getAuth();
    } else {
      this.getAndSetActivities(token);
      this.getAndSetTweets();
    }    
  }

  getAuth() {
    axios.get("/api/auth")
    .then(function(res) {
      window.location = res.data; 
    });
  }
    
  getAndSetActivities(token) {
    axios.get('/api/activities', { 
      params: {
        't': token
      }
    })
    .then(response => {
      if (response.data != null) {
        let activities = response.data;
  
        this.setState({
          activities: activities
        });
      } else {
        this.setState({
          activities_failed: true
        });
      }
    })
    .catch(error => { // handle json response
      console.log(error);
    });
  }

  getAndSetTweets(max_id = 0) {
    let url = "/api/tweets/";

    axios.get(url + max_id)
    .then(response => {
      if (this.state.activities.length > 0) {
        let currentState = this.state.tweets;
        let tweets = currentState.concat(response.data);
        let activities = this.state.activities;
  
        this.setState({
          tweets: tweets
        });
        let oldest_act = activities[activities.length - 1];
        let oldest_tweet = tweets[tweets.length - 1];
  
        if (oldest_act.start_date < oldest_tweet.created_at) {
          this.getAndSetTweets(oldest_tweet.id);
        } else {
          tweets = this.state.tweets;
          activities = this.state.activities;
  
          this.setTweetsInActivities(activities, tweets);
        }
      }
    })
    .catch(error => {
      console.log("Cannot get tweets: " + error);
    });
  }

  inRange(tweet_created_at, activity) {
    if (tweet_created_at > activity.start_date && tweet_created_at < activity.end_date){
      return true;
    }
  }

  setTweetsInActivities(activities, tweets) {
    for (let i = 0; i < tweets.length; i++) {
      let created_at = tweets[i].created_at;
      for (let j = 0; j < activities.length; j++) {
        if (this.inRange(created_at, activities[j])) {
          activities[j].tweets.push(tweets[i]);
        }
      }
    }

    this.setState({
      activities: activities,
      tweets_loaded: true
    })
  }
    
  render() {
    if (!this.state.activities_failed) {
      if (this.state.tweets_loaded) {
        let state_data = {
          activities: this.state.activities,
          tweets: this.state.tweets,
          activities_failed: this.state.activities_failed,
          tweets_loaded: this.state.tweets_loaded
        }

        return ( 
          <ActivityList data={state_data}/>
        )
      } else {
        return (
          <GettingActivities />
        )
      }
    } else {
      return (
        <ActivitiesFailed />
      )
    }
  }
}


