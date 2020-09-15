import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import {
  Centered,
  ActionBar,
  ActionButton,
} from './components';
import {
  Guess,
  Hardcore,
  TimeAttack,
} from './pages';
import { Provider } from './context/pokemon';

const Home = () => {
  const history = useHistory();
  return (
    <Centered>
      <div style={{ paddingBottom: '2em', paddingTop: '2em' }}>
        <h1>PokeGuess</h1>
        <p>
          Start a new game
        </p>
      </div>
      <ActionBar>
        <ActionButton label="Casual" action={() => history.push('/casual')} />
        <ActionButton label="Hardcore" action={() => history.push('/hardcore')} />
        <ActionButton label="Time Attack" action={() => history.push('/time-attack')} />
      </ActionBar>
    </Centered>
  );
}

export const App = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      textAlign: 'center'
    }}
  >
    <Provider>
      <Router>
        <Switch>
          <Route path="/casual" exact>
            <Guess />
          </Route>
          <Route path="/hardcore" exact>
            <Hardcore />
          </Route>
          <Route path="/time-attack" exact>
            <TimeAttack  />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </div>
);