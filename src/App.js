import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Guess } from './pages/Guess';
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
              <div>TODO</div>
            </Route>
            <Route path="/time-attack" exact>
              <div>TODO</div>
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
