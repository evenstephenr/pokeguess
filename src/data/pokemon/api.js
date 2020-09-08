export function getPokemon() {
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