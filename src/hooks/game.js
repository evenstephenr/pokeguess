import {
  useReducer,
} from 'react';
import {
  ShuffleArray,
} from '../utils';

export const STATE = {
  IN_PROGRESS: 'IN PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}
export const ACTION = {
  POP: 'POP',
  SKIP: 'SKIP',
  RESET: 'RESET',
  HELP: 'HELP',
  STOP: 'STOP',
  TOGGLE_ERROR: 'TOGGLE_ERROR',
}
const ERRORS = [
  'It was so close!',
  'Argh, almost had it!',
  'Not quite!',
]
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
        queue: Array.from(shuffled).slice(1, shuffled.length),
        current: Array.from(shuffled).shift()
      }
    }
    case ACTION.HELP: {
      const { current } = prevState
      let name = current.name;
      if (current.id === 29 || current.id === 32) {
        name = 'nidoran'
      }
      if (current.id === 122) {
        name = 'mr. mime'
      }
      const helpText = ShuffleArray(name.split('')).join('')
      return {
        ...prevState,
        helpText,
      }
    }
    case ACTION.STOP: {
      return {
        ...prevState,
        state: STATE.FAILURE,
      }
    }
    case ACTION.TOGGLE_ERROR: {
      const { errorIndex = -1 } = prevState;
      return {
        ...prevState,
        errorIndex: (errorIndex + 1) % ERRORS.length,
      }
    }
    default:
      return prevState;
  }
}

const useGameStateReducer = ({ queue }) => {
  const shuffledQueue = ShuffleArray([...queue]);
  return useReducer(reducer, {
    state: STATE.IN_PROGRESS,
    queue: shuffledQueue.slice(1, queue.length),
    current: shuffledQueue.shift()
  })
}

// TODO: try using regex here
const VALIDATION_MAP = {
  default: (a, b) => a.toLocaleLowerCase() === b.toLocaleLowerCase(),
  29: (a, b) => a.toLocaleLowerCase() === 'nidoran' || VALIDATION_MAP.default(a, b),
  32: (a, b) => a.toLocaleLowerCase() === 'nidoran' || VALIDATION_MAP.default(a, b),
  122: (a, b) => a.toLocaleLowerCase().replaceAll(' ', '') === 'mrmime' || a.toLocaleLowerCase().replaceAll(' ', '') === 'mr.mime' || VALIDATION_MAP.default(a, b)
}

export function useDefaultGame({
  queue,
}) {
  const [state, dispatch] = useGameStateReducer({ queue })

  const pop = () => dispatch({ type: ACTION.POP });
  const skip = () => dispatch({ type: ACTION.SKIP });
  const reset = () => dispatch({ type: ACTION.RESET, queue });
  const help = () => dispatch({ type: ACTION.HELP })
  
  const validator = VALIDATION_MAP[state.current.id] || VALIDATION_MAP['default'];
  const validate = (guess) => {
    let isValid = validator(guess, state.current.name);
    if (!isValid) dispatch({ type: ACTION.TOGGLE_ERROR })
    return isValid;
  }
  return {
    ...state,
    dispatch,
    pop,
    skip,
    reset,
    help,
    validate,
    error: ERRORS[state.errorIndex]
  }
}
