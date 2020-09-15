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
  useTimedGame,
} from '../hooks/game';

export const TimeAttack = WithPokeState(({
  pokemon,
}) => {
  const history = useHistory()
  const {
    current,
    queue,
    validate,
    state,
    error,
    dispatch,
    timeMS,
  } = useTimedGame({
    queue: pokemon,
    timer: 10000,
  });

  return (
    <>
      <Centered>
        <Sprite src={current.sprite} />
        <p>Time left: {timeMS / 1000} seconds!</p>
        {state !== STATE.FAILURE && (
          <Name validate={validate} pop={() => dispatch({ type: ACTION.POP })} />
        )}
        {error && (<p>{error}</p>)}
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
