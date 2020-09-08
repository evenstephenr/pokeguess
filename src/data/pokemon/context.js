import React, {
  createContext,
  useState,
  useEffect,
} from 'react';
import { getPokemon } from './api';

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
      {children}
    </P>
  )
}