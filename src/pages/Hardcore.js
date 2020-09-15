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
  Centered,
} from '../components';
import {
  WithPokeState,
} from '../context/pokemon';
import {
  STATE,
  ACTION,
  useHardcoreGame,
} from '../hooks/game';

export const Hardcore = WithPokeState(({
  pokemon,
}) => {
  const history = useHistory();
  const {
    current,
    queue,
    validate,
    state,
    error,
    dispatch,
    allowedFailures,
  } = useHardcoreGame({
    queue: pokemon,
    allowedFailures: 5,
  });

  return (
    <>
      <Centered>
        <Sprite src={current.sprite} />
        {state !== STATE.FAILURE && (
          <Name validate={validate} pop={() => dispatch({ type: ACTION.POP })} />
        )}
        { error && (<p>{error}</p>)}
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
        <Remainder queue={queue} />
        <Debug data={state} />
        <Debug data={current} />
      </Centered>
    </>
  );
});
