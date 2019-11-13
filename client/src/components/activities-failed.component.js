import React, { Component } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

export default class ActivitiesFailed extends Component {
    render(props) {
      return (
        <Container>
          <Jumbotron>        
            <h1 className="display-4">Activities FAILED</h1>
          </Jumbotron>
        </Container> 
      )
    }
  }