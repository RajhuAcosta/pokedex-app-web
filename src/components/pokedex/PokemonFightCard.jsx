import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const PokemonFightCard = () => {
  const {pokemonId} = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [pokemonEvolution, setPokemonEvolution] = useState(null);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(({data}) => setPokemon(data))
      .catch((error) => console.log(error))
  }, []);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then(({data}) => setPokemonDetail(data))
      .catch((error) => console.log(error))
  }, []);
  useEffect(() => {
    axios
      .get(`${pokemon_evolutions}`)
      .then(({data}) => setPokemonEvolution(data))
      .catch((error) => console.log(error))
  }, [pokemonDetail]);
  const pokemon_evolutions = pokemonDetail?.evolution_chain.url;
  console.log(pokemon)  
  console.log(pokemonDetail)
  console.log(pokemonEvolution)
    return (
        <article className="bg-black h-screen flex items-center justify-center text-white">
          <div className="w-[320px] h-[800px]">
            <div className="bg-yellow-900 flex">
              <div className="text-center">
                <p>Tipo 1</p>
                <img src="" alt="" />
                <p>Name Type</p>
              </div>
              <div className="flex-1">
                <div>
                  <p>ATTACK 5000</p>
                </div>
                <div>
                  <p>debil contra</p>
                </div>
                <div className="flex gap-2">
                  <img src="" alt="" />
                  <img src="" alt="" />
                  <img src="" alt="" />
                </div>
              </div>
              <div className="text-center">
                <p>Tipo 2</p>
                <img src="" alt="" />
                <p>Name Type</p>
              </div>
            </div>
            <div className="bg-blue-400 relative h-[355px]">
              <p className="absolute -rotate-90 right-0 translate-x-10 translate-y-56">DEFENSE 3200</p>
              <img className="block mx-auto w-[320px]" src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </div>
            <div className="bg-red-400 flex justify-center">
              <picture>
                <img src="" alt="" />
              </picture>
              <div className="">
                <p className="uppercase">{pokemon?.name}</p>
                <div className="flex">
                  <p>prevolution -{">"}</p>
                  <img src="" alt="" />
                  <p>-{">"} prevolution</p>
                </div>
              </div>
            </div>
            <div className="flex bg-purple-500 justify-between">
              <p className="invisible">#id</p>
              <div>
                <p className="">Evolution/Common</p>    
                <picture className=""><img src="" alt="" /></picture>
              </div>
              <p>#id</p>
            </div>
          </div>
          
        </article>
    );
}
export default PokemonFightCard