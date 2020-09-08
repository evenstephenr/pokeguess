import React, {
  useState,
} from 'react';
import {
  Consumer as PokemonConsumer,
} from '../../data/pokemon'
import {
  Provider as GameStateProvider,
  Consumer as GameStateConsumer,
  STATE,
} from '../../data/game'
import {
  ShuffleArray,
} from '../../utils'

function Actions() {
  return (
    <GameStateConsumer>
      {(context) => {
        if (!context) return null;
        const {
          skip,
          reset,
          state,
        } = context;

        if (state === STATE.IN_PROGRESS) {
          return (
            <>
              <button onClick={() => skip()}>skip</button>
            </>
          )
        }

        if (state === STATE.SUCCESS) {
          return (
            <>
              <button onClick={() => reset()}>go again</button>
            </>
          )
        }

        return null
      }}
    </GameStateConsumer>
  )
}

function Name() {
  const [value, setValue] = useState('')
  return (
    <GameStateConsumer>
      {(context) => {
        if (!context) return null;
        const {
          current,
          pop,
        } = context;

        return (
          <>
            <form onSubmit={(e) => {
              e.preventDefault();
              console.log('guess: ', value, 'target: ', current.name)
              if (current.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                pop();
                setValue('');
              }
            }}>
              <input type="text" onChange={({ target }) => setValue(target.value)} value={value} />
              <button type="submit">guess</button>
            </form>
          </>
        )
      }}
    </GameStateConsumer>
  )
}

function Sprite() {
  return (
    <GameStateConsumer>
      {(context) => {
        if (!context) return null;
        const {
          current,
        } = context;

        return (
          <>
            <img src={current.sprite} alt={`??? sprite`} style={{ height: '240px', width: '240px' }} />
          </>
        )
      }}
    </GameStateConsumer>
  )
}

export function Guess() {
  return (
    <PokemonConsumer>
      {(context) => {
        if (!context) return null;
        const { pokemon, error } = context;
        if (error) {
          return (
            <p>Sorry, the game is undergoing maintenance, please get in touch if you want to see it back up again ASAP</p>
          )
        }

        if (pokemon) {
          debugger;
          return (
            <GameStateProvider queue={ShuffleArray(pokemon)}>
              <Actions />
              <Name />
              <Sprite />
            </GameStateProvider>
          )
        }

        return null
      }}
    </PokemonConsumer>
  )
}