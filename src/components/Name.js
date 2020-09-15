import React, {
  useState,
} from 'react';

export const NameInput = ({
  value,
  onChange,
}) => (
  <input 
    type="text" 
    onChange={onChange} 
    value={value} 
    autoFocus
    style={{
      textAlign: 'center',
      padding: '1em',
      marginBottom: '1em',
      border: 'unset',
      background: 'unset',
      borderRadius: 'unset',
      borderBottom: '2px solid #000',
      outline: 'none',
      fontFamily: "'Press Start 2P', 'Helvetica Neue', 'Roboto', sans-serif",
      fontSize: '1em'
    }}
  />
);

export const NameSubmit = () => (
  <button
    type="submit"
    style={{
      background: 'unset',
      padding: '1em 2em',
      display: 'inline-block',
      fontFamily: "'Press Start 2P', 'Helvetica Neue', 'Roboto', sans-serif",
      border: '2px solid #000',
      backgroundColor: '#000',
      color: '#fff',
      borderRadius: '4px',
      outline: 'none',
      cursor: 'pointer'
    }}
  >
    Guess
  </button>
);

export const NameForm = ({
  validate,
  pop,
}) => {
  const [name, setName] = useState('');

  return (
    <>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (validate(name)) {
            pop()
            setName('')
            return
          }
        }}
        style={{
          display: 'inline-flex',
          flexDirection: 'column'
        }}
      >
        <NameInput onChange={({ target }) => setName(target.value)} value={name} />
        <NameSubmit />
      </form>
    </>
  );
};

export const Name = NameForm;