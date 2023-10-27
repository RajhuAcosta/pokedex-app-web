import PokemonCard from "./PokemonCard"
const PokemonList = ({pokemons}) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,270px)] justify-center max-w-[1700px] mx-auto gap-6 pt-6 xsm:pt-8 pb-10 px-7">
      {/* className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] */}
      {
        pokemons.map((pokemon)=>(<PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>))
      }
    </section>
  )
}

export default PokemonList