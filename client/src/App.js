import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Container } from 'react-bootstrap';
import Main from './components/main.component';

function App() {
  return (
    <Router>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/lumen/bootstrap.min.css"
      />
      <Container>
        {/*<Navbar />*/}
        <br/>
        <Route path="/" exact component={Main} />
      </Container>
    </Router>
  );
}

export default App;
