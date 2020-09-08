import React, {
  useState,
} from 'react';
import {
  Consumer as PokemonConsumer,
} from '../../context/pokemon'
import {
  Provider as GameStateProvider,
  WithGameState,
  STATE,
} from '../../context/game'
import {
  ShuffleArray,
} from '../../utils'

const Actions = WithGameState(({
  skip,
  help,
  reset,
  state,
  queue,
}) => {
  if (state === STATE.IN_PROGRESS) {
    return (
      <>
        <p>{queue.length} pokemon left!</p>
        <button onClick={() => skip()}>skip</button>
        <button onClick={() => help()}>help</button>
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

  return null;
})

const Name = WithGameState(({
  helpText,
  pop,
  validate,
}) => {
  const [value, setValue] = useState('')
  const [err, setErr] = useState(false)
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (validate(value)) {
          pop()
          setValue('')
          setErr(false);
          return
        }
        setErr(true)
      }}>
        { helpText && (<input type="text" readonly disabled value={helpText} />)}
        <input type="text" onChange={({ target }) => setValue(target.value)} value={value} />
        <button type="submit">guess</button>
        { err && (<p>wrong!</p>)}
      </form>
    </>
  )
})

const Sprite = WithGameState(({
  current,
}) => (
  <>
    <img src={current.sprite} alt={`??? sprite`} style={{ height: '240px', width: '240px' }} />
  </>
))

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