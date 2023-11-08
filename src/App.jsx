import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokemonDetail from './pages/PokemonDetail'
import PrivateRoutes from './components/PrivateRoutes'
import PokemonFightCard from './components/pokedex/PokemonFightCard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route element={<PrivateRoutes/>}>
          <Route path="/pokedex" element={<Pokedex/>} />
          <Route path="/pokedex/:pokemonId" element={<PokemonDetail/>} />
          <Route path="/pokedex/pokeCard/:pokemonId" element={<PokemonFightCard/>} />
        </Route>
        <Route path="*" element={<h1>Error 404 Página no encontrada</h1>} />
      </Routes>
    </>
  )
}

export default App
