import React, {
  createContext,
  useReducer,
  useCallback,
} from 'react';
import {
  ShuffleArray,
} from '../../utils'

export const STATE = {
  IN_PROGRESS: 'IN PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}
const ACTION = {
  POP: 'POP',
  SKIP: 'SKIP',
  RESET: 'RESET'
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
  debugger;
  switch (action.type) {
    case ACTION.POP: {
      const { queue } = prevState;
      const nextMonster = queue.shift();

      if (!nextMonster) {
        return {
          queue: [],
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
    default:
      return prevState;
  }
}

const { Consumer: C, Provider: P } = createContext(null);
export const Consumer = C;
export const Provider = ({
  children,
  queue,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: STATE.IN_PROGRESS,
    queue: Array.from(queue).slice(1, queue.length - 1), 
    current: Array.from(queue).shift()
  });
  const pop = useCallback(() => dispatch({ type: ACTION.POP }), [dispatch]);
  const skip = useCallback(() => dispatch({ type: ACTION.SKIP }), [dispatch]);
  const reset = useCallback(() => dispatch({ type: ACTION.RESET, queue }), [dispatch, queue]);

  return (
    <P
      value={{
        ...state,
        dispatch,
        pop,
        skip,
        reset,
      }}
    >
      {children}
    </P>
  )
}