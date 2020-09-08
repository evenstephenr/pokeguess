import React from 'react';
import { Guess } from '../Guess';

export function App() {
  console.log('render')
  return (
    <div className="App">
      <Guess />
    </div>
  );
}
