import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { colorByType, colorsByType, borderByType, bordersByType } from "../../constants/pokemon"

const PokemonCard = ({pokemonUrl}) => {
  const [pokemon, setPokemon] = useState(null)
  useEffect(()=>{
    axios
    .get(pokemonUrl)
    .then(({data}) => setPokemon(data))
    .catch((error) => console.log(error))
  },[])
  return (
    <Link to={`/pokedex/${pokemon?.id}`} className="capitalize border-8 rounded-lg text-center" style={pokemon?.types.length>1?{borderColor: `${bordersByType[pokemon?.types[0].type.name]}`}:{borderColor: `${borderByType[pokemon?.types[0].type.name]}`}}>
      {/*  ${borderByType[pokemon?.types[0].type.name]} */}
      <div className="h-[140px]" style={pokemon?.types.length>1?{background: `linear-gradient(to top,${colorByType[pokemon?.types[1].type.name]} 0%,${colorByType[pokemon?.types[0].type.name]} 75%)`}:{background: `linear-gradient(to top,${colorsByType[pokemon?.types[0].type.name]}`}}></div>
      <div className="relative pt-14">
        <div className="absolute w-full top-0 -translate-y-2/3">
            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" className="max-w-[180px] mx-auto" />
        </div>
        <h3 className="text-xl font-semibold" style={pokemon?.types.length>1?{color: `${borderByType[pokemon?.types[0].type.name]}`}:{color: `${colorByType[pokemon?.types[0].type.name]}`}}>{pokemon?.name.replaceAll("-"," ")}</h3>
        <span className="text-sm font-semibold">{pokemon?.types.map((type)=>type.type.name).join(" / ")}</span>
        <h5  className="font-semibold text-xs mb-2 text-slate-400 mt-1">type</h5>
        <hr />
        <ul className="grid gap-4 grid-cols-2 text-sm p-2 pb-5">
          { 
            pokemon?.stats.slice(0,4).map((stat)=>(
                <li key={stat.stat.name} className="grid gap-1">
                    <h6 className="font-medium">{stat.stat.name}</h6>
                    <span style={pokemon?.types.length>1?{color: `${borderByType[pokemon?.types[0].type.name]}`}:{color: `${colorByType[pokemon?.types[0].type.name]}`}} className="font-bold">{stat.base_stat}</span>
                </li>
            ))
          }
        </ul>
      </div>
    </Link>
  )
}

export default PokemonCard