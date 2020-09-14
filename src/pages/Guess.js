import React from 'react';
import {
  useHistory,
} from "react-router-dom";
import {
  ActionBar,
  ActionButton,
  Debug,
  Name,
  Sprite,
  Remainder,
  Hint,
} from '../components'
import {
  WithPokeState,
} from '../context/pokemon'
import {
  STATE,
  useDefaultGame,
} from '../hooks/game'

export const Guess = WithPokeState(({
  debug = false,
  pokemon,
}) => {
  const history = useHistory()
  const {
    current,
    queue,
    helpText,
    pop,
    validate,
    skip,
    help,
    reset,
    state,
    error,
  } = useDefaultGame({
    queue: pokemon
  })

  return (
    <>
      <Remainder queue={queue} />
      <ActionBar>
        { state === STATE.IN_PROGRESS && (
          <>
            <ActionButton label="Skip" action={skip} />
            <ActionButton label="Help" action={help} />
            <ActionButton label="Quit" action={() => history.push('/')} />
          </>
        )}
        { state === STATE.SUCCESS && (
          <>
            <ActionButton label="Play again" action={reset} />
          </>
        )}
      </ActionBar>
      <Name validate={validate} pop={pop} />
      <Sprite src={current.sprite} />
      { error && (<p>{error}</p>)}
      { helpText && (<Hint value={helpText} />)}
      { debug && (
        <>
          <Debug data={state} />
          <Debug data={current} />
        </>
      )}
    </>
)})
