import React from 'react';
import { Provider, Consumer } from '../../data/pokemon'

export function Guess() {

  return (
    <Provider>
      <Consumer>
        {(context) => {
          if (!context) return null;

          return (
            <pre>
              {JSON.stringify(context, null, 2)}
            </pre>
          )
        }}
      </Consumer>
    </Provider>
  )
}