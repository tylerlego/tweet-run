import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardGroup, Modal } from 'react-bootstrap';
import moment from 'moment';

export default class TweetModal extends Component {
  constructor(props) {
    super(props);

  }
  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }
 
  renderTweetInfo() {
    let tweetInfo = [];

    for (let tweet of this.props.tweets) {
      console.log(tweet.urls);

      tweetInfo.push(
        <div className="tweet-info" key={tweet.id}>
          <h4>{ moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a') }</h4>
          <p>
            { tweet.text }
          </p>
        </div>
      )
    }

    return tweetInfo;
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Tweets For Activity:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.renderTweetInfo() }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { this.props.onHide() }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


