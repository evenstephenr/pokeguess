import React from 'react';
import { Guess } from './pages/Guess';
import { Provider } from './context/pokemon'

export function App() {
  return (
    <div className="App">
      <Provider>
        <Guess />
      </Provider>
    </div>
  );
}
