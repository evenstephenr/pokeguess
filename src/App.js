import React from 'react';
import { Guess } from './pages/Guess';
import { Provider } from './data/pokemon'

export function App() {
  return (
    <div className="App">
      <Provider>
        <Guess />
      </Provider>
    </div>
  );
}
