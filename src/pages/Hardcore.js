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
  ACTION,
  useHardcoreGame,
} from '../hooks/game'

export const Hardcore = WithPokeState(({
  debug = false,
  pokemon,
}) => {
  const history = useHistory()
  const {
    current,
    queue,
    helpText,
    validate,
    state,
    error,
    dispatch,
    allowedFailures,
  } = useHardcoreGame({
    queue: pokemon,
    allowedFailures: 5,
  })

  return (
    <>
      <Remainder queue={queue} />
      <p>Guesses left: {allowedFailures}</p>
      <ActionBar>
        {state === STATE.IN_PROGRESS && (
          <>
            <ActionButton label="Quit" action={() => history.push('/')} />
          </>
        )}
        {(state === STATE.SUCCESS || state === STATE.FAILURE) && (
          <>
            <ActionButton label="Play again" action={() => dispatch({ type: ACTION.RESET })} />
            <ActionButton label="Main Menu" action={() => history.push('/')} />
          </>
        )}
      </ActionBar>
      {state !== STATE.FAILURE && (
        <Name validate={validate} pop={() => dispatch({ type: ACTION.POP })} />
      )}
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
  )
})
