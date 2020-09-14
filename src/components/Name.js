import React, {
  useState,
} from 'react'

export const NameInput = ({
  value,
  onChange,
}) => (
  <input type="text" onChange={onChange} value={value} />
)

export const NameSubmit = () => (
  <button type="submit">guess</button>
)

export const NameForm = ({
  validate,
  pop,
}) => {
  const [name, setName] = useState('')

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (validate(name)) {
          pop()
          setName('')
          return
        }
      }}>
        <NameInput onChange={({ target }) => setName(target.value)} value={name} />
        <NameSubmit />
      </form>
    </>
  )
}

export const Name = NameForm;