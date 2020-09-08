import React, {
  createContext,
  useState,
  useEffect,
} from 'react';
import {
  WithState,
} from '../utils'

function getPokemon() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/generation/1')
      if (response.ok) {
        const results = await response.json();
        resolve(results);
      }
    } catch (e) {
      reject(e.message);
    }
    reject('pokeapi err, service unavailable :(')
  })
}

function mutatePokemon(d) {
  const species = d.pokemon_species;
  return species.map((poke) => {
    const { name, url } = poke;
    const id = +url.replace('https://pokeapi.co/api/v2/pokemon-species', '').replaceAll('/', '');
    return {
      id,
      name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
  }).sort((a, b) => a.id - b.id)
}

const { Consumer: C, Provider: P } = createContext(null)
export const Consumer = C;
export const Provider = ({
  children,
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pokeKey = "pokemon_gen_1";
    async function setPokemon() {
      const pokemon = await getPokemon().catch((e) => setError(e))
      window.localStorage.setItem(pokeKey, JSON.stringify(pokemon));
      setData(mutatePokemon(pokemon));
      return;
    }

    const checkCache = window.localStorage.getItem(pokeKey);
    if (!checkCache) {
      setPokemon();
      return;
    }

    setData(mutatePokemon(JSON.parse(checkCache)));

    return () => {
      setData(null);
      setError(null);
    }
  }, [])

  return (
    <P
      value={{
        pokemon: data,
        error,
      }}
    >
      { 
        (error || !data) && (
          <p>Sorry, the game is undergoing maintenance, please get in touch if you want to see it back up again ASAP</p>
        )
      }
      {data && children}
    </P>
  )
}

export const WithPokeState = Component => props => WithState(Consumer)(Component)(props);