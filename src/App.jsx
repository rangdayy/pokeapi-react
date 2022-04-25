
import { LanguageProvider } from "./containers/language";
import LanguageSelector from "./components/languageSelector";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material"
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import SpokeIcon from '@mui/icons-material/Spoke';
import { useState, useContext } from "react"
import { Route, Routes, Link } from "react-router-dom";
import { LanguageContext } from './containers/language';
import { Home } from "./pages/home";
import { Pokedex } from "./pages/pokedex";
import { DetailPokemon } from "./pages/detailPokemon";

function App() {
  const [value, setValue] = useState(0)
  const { dictionary } = useContext(LanguageContext);
  return (
    <>
      <LanguageProvider>
        <div className="App">
          <header className="App-header">
            <LanguageSelector />
          </header>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/pokedex" element={<Pokedex />} />
              <Route path="/:pokemon" element={<DetailPokemon />} />
            </Routes>
          </div>
          <div className="footer">
            <Box sx={{marginTop:10, marginBottom:10}}></Box>
          </div>
          <div className="nav">
            <BottomNavigation
              showLabels
              sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
              }}
              value={value}
              onChange={(event, newValue) => { setValue(newValue) }}            >
              <BottomNavigationAction component={Link} to="/" label={dictionary.navHome} icon={<CatchingPokemonIcon />} />
              <BottomNavigationAction component={Link} to="/pokedex" label={dictionary.navPokedex} icon={<SpokeIcon />} />
            </BottomNavigation >
          </div>
        </div>
      </LanguageProvider>
    </>
  );
}

export default App;
