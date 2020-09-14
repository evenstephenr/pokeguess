import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Guess,
  Hardcore,
  TimeAttack,
} from './pages';
import { Provider } from './context/pokemon'

const Home = () => (
  <>
    <p>Start a new game</p>
    <nav>
      <ul>
        <li>
          <Link to="/casual">Casual</Link>
        </li>
        <li>
          <Link to="/hardcore">Hardcore</Link>
        </li>
        <li>
          <Link to="/time-attack">Time Attack</Link>
        </li>
      </ul>
    </nav>
  </>
)

export function App() {
  return (
    <div className="App">
      <Provider>
        <Router>
          <Switch>
            <Route path="/casual" exact>
              <Guess debug />
            </Route>
            <Route path="/hardcore" exact>
              <Hardcore debug />
            </Route>
            <Route path="/time-attack" exact>
              <TimeAttack debug />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}
