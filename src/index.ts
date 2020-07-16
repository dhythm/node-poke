import fetch from "node-fetch";

const app = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/type/1");
  const json = await res.json();
  const details = json.pokemon.map(async (i) => {
    const prefetched = await fetch(i.pokemon.url);
    return prefetched.json();
  });

  const payload = (await Promise.all(details)).map((data: any) => ({
    name: data.name,
    image: data.sprites["front_default"],
  }));
  console.log({ payload });
};

// (async function () {
//   await app();
// })();
app();
