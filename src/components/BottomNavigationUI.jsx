import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import SpokeIcon from '@mui/icons-material/Spoke';
import { useState, useContext } from "react"
import { LanguageContext } from '../containers/language';
import { Container } from "@mui/material";
import { Home } from "../pages/home";
import { Pokedex } from "../pages/pokedex";

export const BottomNavigationUI = () => {
    const [value, setValue] = useState(0)
    const { dictionary } = useContext(LanguageContext);
    //Create an array to hold components
    const compArray = [<Home />, <Pokedex />]
    return (
        <>
            {/* <Container maxWidth="lg"> */}
                {compArray[value]}
            {/* </Container> */}

            <BottomNavigation
                sx={{
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                }}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
                showLabels
            >
                <BottomNavigationAction label={dictionary.navHome} icon={<CatchingPokemonIcon />} />
                <BottomNavigationAction label={dictionary.navPokedex} icon={<SpokeIcon />} />
            </BottomNavigation >
        </>

    );
}
