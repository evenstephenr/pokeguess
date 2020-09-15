import React from 'react';

/** https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm */
export function ShuffleArray(arr) {
  const array = Array.from(arr);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/** Use this to wire up any Context provider as an HOC */
export const WithState = Consumer => Component => props => {
  return (
    <Consumer>
      {(context) => {
        if (!context) return null;
        return (<Component {...context} {...props} />);
      }}
    </Consumer>
  )
};

/** random algo that is likelier to return 'true' as (pos/base === 1) */
export function roll(base, pos) {
  return (pos / base) / Math.random() * 10 > 10;
};

/** Given a string, masks some characters in the string as '-' and returns the new string */
export function MaskString(s) {
  const len = s.length;

  return s.split('').map((char, i) => {
    if (roll(len, i)) {
      return '-';
    }
    return char;
  }).join('');
};
