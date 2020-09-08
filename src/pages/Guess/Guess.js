import React, {
  useState,
} from 'react';
import {
  useHistory,
} from "react-router-dom";

import {
  WithPokeState,
} from '../../context/pokemon'
import {
  STATE,
  useDefaultGame,
} from '../../hooks/game'

const Countdown = ({
  queue,
}) => (
  <>
    <div>{queue.length} pokemon left!</div>
  </>
)

const Actions = ({
  skip,
  help,
  reset,
  state,
}) => {
  let history = useHistory();

  if (state === STATE.IN_PROGRESS) {
    return (
      <>
        <button onClick={() => skip()}>skip</button>
        <button onClick={() => help()}>help</button>
        <button onClick={() => history.push('/')}>Quit</button>
      </>
    )
  }

  if (state === STATE.SUCCESS || state === STATE.FAILURE) {
    return (
      <>
        <button onClick={() => reset()}>go again</button>
      </>
    )
  }

  return null;
}

const Name = ({
  helpText,
  pop,
  validate,
  error,
}) => {
  const [value, setValue] = useState('')
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (validate(value)) {
          pop()
          setValue('')
          return
        }
      }}>
        { helpText && (<input type="text" readOnly disabled value={helpText} />)}
        <input type="text" onChange={({ target }) => setValue(target.value)} value={value} />
        <button type="submit">guess</button>
        {error && (<p>{error}</p>)}
      </form>
    </>
  )
}

const Sprite = ({
  current,
}) => {
  return (
    <>
      <img src={current.sprite} alt={`??? sprite`} style={{ height: '240px', width: '240px' }} />
    </>
  )
}

// TODO: add a timed version of the game
// const Timer = ({
//   dispatch,
//   time,
// }) => {
//   const [timeMS, setTimeMS] = useState(time || 10000)
//   const active = useRef(true)

//   useEffect(() => {
//     let countdown;
//     console.log('interval')
//     if (active.current) {
//       countdown = setTimeout(() => {
//         if (timeMS - 1000 <= 0) {
//           dispatch({ type: ACTION.STOP })
//           active.current = false;
//           clearTimeout(countdown)
//         }
//         setTimeMS(timeMS - 1000);
//       }, 1000);
//     }
//   }, [timeMS])

//   return (
//     <p>Time left: {timeMS / 1000} seconds!</p>
//   )
// }

const Debug = ({ current, state }) => (
  <pre>
    {JSON.stringify(state, null, 2)}
    {JSON.stringify(current, null, 2)}
  </pre>
)

export const Guess = WithPokeState(({
  debug = false,
  pokemon,
}) => {
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
      <Countdown queue={queue} />
      <Actions skip={skip} help={help} reset={reset} state={state} />
      <Name helpText={helpText} pop={pop} validate={validate} error={error} />
      <Sprite current={current} />
      {/* <Timer dispatch={dispatch} /> */}
      { debug && <Debug current={current} state={state} />}
    </>
)})
