import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Main from './components/main.component';

function App() {
  return (
    <Router>
      <div className="container">
        {/*<Navbar />*/}
        <br/>
        <Route path="/" exact component={Main} />
      </div>
    </Router>
  );
}

export default App;
