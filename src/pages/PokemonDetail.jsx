import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import HeaderPokeball from "../components/layouts/HeaderPokeball";
import { colorByType, colorsByType, bgCardByType } from "../constants/pokemon";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null)
  const [pokemonDetail, setPokemonDetail] = useState(null)
  const {pokemonId} = useParams();
  const getPercentStat = (statValue) => {
    const max_stat_value = 255;
    const percent_stat = ((statValue*100)/(max_stat_value)).toFixed(1);
    return `${percent_stat}%`
  }
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
  return (
    <div className="text-center capitalize">
      <HeaderPokeball/>
      <main className="py-10 mt-8 px-2">
        <div className="max-w-[1000px] mx-auto" style={{boxShadow: "0px 2px 16px 0px rgba(0, 0, 0, 0.15)"}}>
          <section className="h-[120px] relative pt-14" style={pokemon?.types.length>1?{background: `linear-gradient(to top,${colorByType[pokemon?.types[1].type.name]} 0%,${colorByType[pokemon?.types[0].type.name]} 75%)`}:{background: `linear-gradient(to top,${colorsByType[pokemon?.types[0].type.name]}`}}>
            <picture className="absolute w-full top-0 -translate-y-1/3 flex justify-center items-center">
                <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" className="max-w-[180px] mx-auto" />
            </picture>
          </section>
          <div className="px-2 mt-3 text-black"  style={pokemon?.types.length>1?{background: `linear-gradient(to left, ${colorByType[pokemon?.types[1].type.name]} 0%, ${colorByType[pokemon?.types[0].type.name]} 90%)`, WebkitBackgroundClip: "text", color: "transparent"}:{color: `${colorByType[pokemon?.types[0].type.name]}`}}>
            {pokemon?.id<10?(<h3 className="text-xl font-bold"># 00{pokemon?.id}</h3>):(pokemon?.id<100?(<h3 className="text-xl font-bold"># 0{pokemon?.id}</h3>):(<h3 className="text-xl font-bold"># {pokemon?.id}</h3>))}
            <section className="flex items-center justify-center mt-1">
              <hr className="flex-grow border-t border-[#9F9F9F]" />
              <p style={pokemon?.types.length>1?{background: `linear-gradient(to left, ${colorByType[pokemon?.types[1].type.name]} 0%, ${colorByType[pokemon?.types[0].type.name]} 90%)`, WebkitBackgroundClip: "text", color: "transparent"}:{color: `${colorByType[pokemon?.types[0].type.name]}`}} className="text-2xl font-semibold font-[Roboto] px-4 bg-clip-text text-transparent">{pokemon?.name}</p>
              <hr className="flex-grow border-t border-[#9F9F9F]" />
            </section>
            <section className="flex justify-center gap-4 lowercase text-black mt-2" style={{backgroundClip: "initial"}}>
              <ul>
                <li className="capitalize font-normal">weight</li>
                <li className="font-semibold text-lg">{pokemon?.weight} kg</li>
              </ul>
              <ul>
                <li className="capitalize font-normal">height</li>
                <li className="font-semibold text-lg">{pokemon?.height} m</li>
              </ul>
            </section>
            <section className="mt-2 text- text-black" style={{backgroundClip: "initial"}}>
              <p className="font-medium text-lg font-[Roboto]">{pokemonDetail?.genera[7].genus}</p>
              <p className="font-normal font-[Inter] px-3 text-base mt-1" style={{textTransform: "none"}}>{pokemonDetail?.flavor_text_entries[11].flavor_text}</p>
            </section>
            <section className="grid lg:flex lg:gap-10 justify-center gap-3 mt-3">
              <div className="text-[#302F2F]">
                {pokemon?.types.length>1 ? (<h3 className="text-lg font-bold font-[Roboto] mb-2">Types</h3>):(<h3 className="text-lg font-bold font-[Roboto] mb-2">Type</h3>)}
                  {pokemon?.types.length>1 ? (
                    <div className="flex text-base font-medium gap-2 place-content-center">
                      <h3 className={`${bgCardByType[pokemon?.types[0].type.name]} px-4`}>{pokemon?.types[0].type.name}</h3>
                      <h3 className={`${bgCardByType[pokemon?.types[1].type.name]} px-4`}>{pokemon?.types[1].type.name}</h3>
                    </div>
                  ):(
                  <div className="flex text-base  place-content-center font-medium">
                    <h3 className={`${bgCardByType[pokemon?.types[0].type.name]} px-4`}>{pokemon?.types[0].type.name}</h3>
                  </div>)}
              </div>
              <div className="text-[#302F2F]">
              {pokemon?.abilities.length>1 ? (<h3 className="text-lg font-bold font-[Roboto] mb-2">Abilities</h3>):(<h3 className="text-lg font-bold font-[Roboto] mb-2">Ability</h3>)}
              {pokemon?.abilities.length>2?(
                <div className="flex text-base font-medium gap-1 xxs:gap-2 place-content-center">
                  <h3 className="px-1 xxs:px-2 sm:px-4 text-white sm:flex sm:items-center bg-red-500">{pokemon?.abilities[1].ability.name.replaceAll("-"," ")}</h3>
                  <h3 className="px-1 xxs:px-2 sm:px-4 text-white sm:flex sm:items-center bg-red-500">{pokemon?.abilities[2].ability.name.replaceAll("-"," ")}</h3>
                  <h3 className="px-1 xxs:px-2 sm:px-4 text-white sm:flex sm:items-center bg-red-500">{pokemon?.abilities[0].ability.name.replaceAll("-"," ")}</h3>
                </div>
              ):(
                pokemon?.abilities.length>1 ? (
                    <div className="flex text-base font-medium gap-2 place-content-center">
                      <h3 className="px-4 text-white bg-red-500">{pokemon?.abilities[0].ability.name.replaceAll("-"," ")}</h3>
                      <h3 className="px-4 text-white bg-red-500">{pokemon?.abilities[1].ability.name.replaceAll("-"," ")}</h3>
                    </div>
                  ):(
                  <div>
                    <h3 className="px-4 text-white bg-red-500">{pokemon?.abilities[0].ability.name.replaceAll("-"," ")}</h3>
                  </div>)
              )}
              </div>
            </section>
            <section>
              <h3 className="text-center text-lg font-bold font-[Roboto] text-[#302F2F] mt-5 mb-2">stats</h3>
              <ul className="grid text-start gap-4 pb-12 px-4 sm:px-5">
                {
                  pokemon?.stats.map((stat) => 
                    <li key={stat.stat.name} className="capitalize font-[Inter] text-[#1a1818]">
                      <div className="flex justify-between items-center">
                        <h5>{stat.stat.name}</h5>
                        <span>{stat.base_stat}/255</span>
                      </div>
                      <div className="bg-black/20 rounded-md h-6">
                        <div style={{width: getPercentStat(stat.base_stat)}} className="bg-red-600 h-full"></div>
                      </div>
                    </li>
                  )
                }
              </ul>
            </section>
          </div>
        </div>
        <div className="h-auto mt-9 xsm:mt-14 max-w-[1000px] mx-auto" style={{boxShadow: "0px 2px 16px 0px rgba(0, 0, 0, 0.15)"}}>
            <h1 className="text-start px-5 py-3 mb-1 mt-1 font-bold text-lg xxs:text-2xl xxs:py-4">Movements</h1>
            <ul className="flex flex-wrap gap-2 px-5 pb-10">
              {
                pokemon?.moves.map((move)=>(
                  <li key={move.move.url}>
                    <p className="text-red-600 font-medium rounded-full px-2 bg-[#E5E5E5]">
                      {move.move.name.replaceAll("-"," ")}
                    </p>
                  </li>
                ))
              }
            </ul>
        </div>
      </main>
    </div>
  )
}

export default PokemonDetail