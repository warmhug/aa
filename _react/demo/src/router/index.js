import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import App from './App';
import P1 from './pages/P1';
import P2 from './pages/P2';

import './index.less';

class Index extends React.Component {
  render() {
    return (
      <div className="body">
        <h1>Stages list</h1>
        <ul role="nav">
          <li><Link to="/p1">P1</Link></li>
          <li><Link to="/p2">P2</Link></li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="p1" component={P1} />
      <Route path="p2" component={P2} />
    </Route>
  </Router>
, document.getElementById('example'));