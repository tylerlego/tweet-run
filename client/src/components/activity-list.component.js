import React, { Component } from 'react';
import TweetRun from './tweet-run.component';
import { Container, Row, Col, Button,  } from 'react-bootstrap'

export default class ActivityList extends Component {
    constructor(props) {
      super(props);
    }

    renderTweetRun() {
      let elements = []; 
         
      for (let i = 0; i < this.props.data.activities.length; i++) {
        let activity = this.props.data.activities[i];
  
        elements.push(
          <Col lg={4} className="activity-card" key={i} >
            <TweetRun data={activity}/>
          </Col>
        );
      }
  
      return elements;
    }

    render() {
      console.log(this.props.data);
      return ( 
          <Container>
            <Row>
              {this.renderTweetRun()}
            </Row>
          </Container> 
      )
    }
  }