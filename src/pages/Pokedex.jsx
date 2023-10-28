import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../components/pokedex/PokemonList";
import HeaderPokeball from "../components/layouts/HeaderPokeball";
import { paginateData } from "../utils/pagination";
import { Link } from "react-scroll";

const Pokedex = () => {
  const trainerName = useSelector((store) => store.trainerName);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(()=>{
    if (currentType==="") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
        .then(({data}) => setPokemons(data.results))
        .catch((error) => console.log(error))
    }
  },[currentType]);
  useEffect(()=>{
    axios
    .get("https://pokeapi.co/api/v2/type")
    .then(({data}) => setTypes(data.results))
    .catch((error) => console.log(error))
  },[]);
  useEffect(()=>{
    if (currentType!=="") {
      axios
      .get(`https://pokeapi.co/api/v2/type/${currentType}`)
      .then(({data}) => {
        setPokemons(data.pokemon.map((pokemon)=>pokemon.pokemon))
      })
      .catch((error) => console.log(error))
    }
  },[currentType]);
  useEffect(() => {
    setCurrentPage(1);
  }, [currentType])
  
  const pokemonsByName = pokemons.filter((pokemon)=>pokemon.name.includes(pokemonName));
  const handleSubmit = (event) => {
    event.preventDefault();
    setPokemonName(event.target.pokemonName.value.toLowerCase().trim());
  }
  const handleChangeType = (event) => {
    setCurrentType(event.target.value);
  }
  const handlePreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  }
  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  }
  const {itemsInCurrentPage,lastPage,pagesInCurrentBlock} = paginateData(pokemonsByName,currentPage);
  return (
    <main id="top" className="font-[Inter]">
      <HeaderPokeball/>
      <section className="px-7 xsm:px-9 md:px-16 2xl:px-[12%] xsm:pt-7 pt-5">
        <p className="font-[Roboto] font-normal pb-3 xsm:pb-4 sm:pb-3 text-base xsm:text-lg">
          <span className="text-[#FE1936] font-bold font-[Inter]">{`Welcome ${trainerName.trim()}`}, </span>
          here you can find your favorite pokemon
        </p>
        <form onSubmit={handleSubmit} className="sm:flex sm:items-center">
          <div className="pb-3 xsm:pb-4">
            <input placeholder="Pokemon's name..." className="px-2 h-[40px] w-[65%] max-w-[240px] outline-none" style={{boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.15)"}} name="pokemonName" type="text" autoComplete="off" />
            <button className="bg-[#D93F3F] text-white px-4 py-2 xsm:px-6">Search</button>
          </div>
          <select onChange={handleChangeType} className="capitalize hover:cursor-pointer outline-none h-[40px] mb-4 xsm:mb-6 font-[Roboto] font-medium text-[#070714] bg-white pl-2 pr-7" style={{boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.15)"}}>
            <option value="" className="bg-white text-red-600 hover:cursor-pointer hover:bg-[#D93F3F]">All pokemons</option>
            {
              types.map((type)=>(
                type.name!=="unknown"&&type.name!=="shadow"? (
                  <option className="bg-white text-red-600 hover:cursor-pointer hover:bg-[#D93F3F]" value={type.name} key={type.url}>{type.name}</option>
                ) : (
                  <option key={type.url} hidden></option>
                )
              ))
                // if (type.name!=="unknown"||type.name!=="shadow") {
                //   <option className="bg-white text-red-600 hover:cursor-pointer hover:bg-[#D93F3F]" value={type.name} key={type.url}>{type.name}</option>
                // }})
            }
          </select>
        </form>
      </section>
      <ul className="flex justify-center gap-3 pt-2">
        {
          currentPage !== 1 && (
            <li>
              <button onClick={handlePreviusPage} className="p-2 text-white font-bold rounded-md bg-red-400 hover:text-red-500 hover:bg-black/5 transition-colors">{"«"}</button>
            </li>
          )
        }
        {
          pagesInCurrentBlock.map((page)=>(
            <li key={page}>
              <button onClick={()=>setCurrentPage(page)} className={`p-2 text-white font-bold rounded-md ${currentPage===page ? "bg-red-500" : "bg-red-400 hover:text-red-500 hover:bg-black/5 transition-colors"}`}>
                {page}
              </button>
            </li>
          ))
        }
        {
          currentPage !== lastPage && (
          <li>
            <button onClick={handleNextPage} className="p-2 text-white font-bold rounded-md bg-red-400 hover:text-red-500 hover:bg-black/5 transition-colors">{"»"}</button>
          </li>
          )
        }
      </ul>
      <PokemonList pokemons={itemsInCurrentPage}/>
      <ul className="flex justify-center gap-3 pt-2 pb-10">
        {
          currentPage !== 1 && (
            <li>
              <Link to="top"><button onClick={handlePreviusPage} className="p-2 text-white font-bold rounded-md bg-red-400 hover:text-red-500 hover:bg-black/5 transition-colors">{"«"}</button></Link>
            </li>
          )
        }
        {
          pagesInCurrentBlock.map((page)=>(
            <li key={page}>
              <Link to="top"><button onClick={()=>setCurrentPage(page)} className={`p-2 text-white font-bold rounded-md ${currentPage===page ? "bg-red-500" : "bg-red-400 hover:text-red-500 hover:bg-black/5 transition-colors"}`}>
                {page}
              </button></Link>
            </li>
          ))
        }
        {
          currentPage !== lastPage && (
          <li className=" hover:text-red-500 hover:bg-black/5 transition-colors">
            <Link to="top"><button onClick={handleNextPage} className="p-2 text-white font-bold rounded-md bg-red-400 hover:text-red-500 hover:bg-black/5 transition-colors">{"»"}</button></Link>
          </li>
          )
        }
      </ul>
    </main>
  );
};

export default Pokedex;
