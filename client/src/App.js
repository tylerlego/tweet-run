import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import ActivityList from "./components/activity-list.component";

function App() {
  return (
    <Router>
      <div className="container">
        {/*<Navbar />*/}
        <br/>
        <Route path="/" exact component={ActivityList} />
      </div>
    </Router>
  );
}

export default App;
