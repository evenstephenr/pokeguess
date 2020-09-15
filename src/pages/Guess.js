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
  Centered,
} from '../components';
import {
  WithPokeState,
} from '../context/pokemon';
import {
  STATE,
  useDefaultGame,
} from '../hooks/game';

export const Guess = WithPokeState(({
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
  });

  return (
    <>
      <Centered>
        <Remainder queue={queue} />
        <Name validate={validate} pop={pop} />
        <Sprite src={current.sprite} />
        {helpText && (<Hint value={helpText} />)}
        {error && (<p>{error}</p>)}
        <ActionBar>
          { state === STATE.IN_PROGRESS && (
            <>
              <ActionButton label="Help" action={help} />
              <ActionButton label="Skip" action={skip} />
              <ActionButton label="Quit" action={() => history.push('/')} />
            </>
          )}
          { state === STATE.SUCCESS && (
            <>
              <ActionButton label="Play again" action={reset} />
            </>
          )}
        </ActionBar>
        <Debug data={state} />
        <Debug data={current} />
      </Centered>
    </>
  );
});
