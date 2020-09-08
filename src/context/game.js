import React, {
  createContext,
  useReducer,
  useCallback,
} from 'react';
import {
  ShuffleArray,
  WithState,
} from '../utils'

export const STATE = {
  IN_PROGRESS: 'IN PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}
const ACTION = {
  POP: 'POP',
  SKIP: 'SKIP',
  RESET: 'RESET',
  HELP: 'HELP',
}
/**
 * state: 'IN PROGRESS', 'SUCCESS', 'FAILURE'
 * queue: { name, imgUrl }[],
 * current?: { name, imgUrl },
 */
const reducer = (
  prevState,
  action,
) => {
  switch (action.type) {
    case ACTION.POP: {
      const { queue } = prevState;
      const nextMonster = queue.shift();

      if (!nextMonster) {
        return {
          state: STATE.SUCCESS,
        };
      }

      return {
        queue,
        current: nextMonster,
        state: prevState.state,
      }
    }
    case ACTION.SKIP: {
      const { queue, current } = prevState;
      queue.push(current);
      const nextMonster = queue.shift();

      return {
        queue,
        current: nextMonster,
        state: prevState.state,
      }
    }
    case ACTION.RESET: {
      const { queue } = action;
      const shuffled = ShuffleArray(queue)

      return {
        state: STATE.IN_PROGRESS,
        queue: Array.from(shuffled).slice(1, shuffled.length - 1),
        current: Array.from(shuffled).shift()
      }
    }
    case ACTION.HELP: {
      const { current } = prevState
      const helpText = ShuffleArray(current.name.split('')).join('')
      return {
        ...prevState,
        helpText,
      }
    }
    default:
      return prevState;
  }
}

const VALIDATION_MAP = {
  default: (a, b) => a.toLocaleLowerCase() === b.toLocaleLowerCase(),
  29: (a, b) => a.toLocaleLowerCase() === 'nidoran' || VALIDATION_MAP.default(a, b),
  32: (a, b) => a.toLocaleLowerCase() === 'nidoran' || VALIDATION_MAP.default(a, b),
}

const { Consumer: C, Provider: P } = createContext(null);
export const Consumer = C;
export const Provider = ({
  children,
  queue,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: STATE.IN_PROGRESS,
    queue: Array.from(queue).slice(1, queue.length), 
    current: Array.from(queue).shift()
  });
  const pop = useCallback(() => dispatch({ type: ACTION.POP }), [dispatch]);
  const skip = useCallback(() => dispatch({ type: ACTION.SKIP }), [dispatch]);
  const reset = useCallback(() => dispatch({ type: ACTION.RESET, queue }), [dispatch, queue]);
  const validator = VALIDATION_MAP[state.current.id] || VALIDATION_MAP['default'];
  const validate = (guess) => validator(guess, state.current.name)
  const help = useCallback(() => dispatch({ type: ACTION.HELP }), [dispatch])
  return (
    <P
      value={{
        ...state,
        dispatch,
        pop,
        skip,
        reset,
        validate,
        help,
      }}
    >
      {children}
    </P>
  )
}

export const WithGameState = Component => props => WithState(Consumer)(Component)(props);