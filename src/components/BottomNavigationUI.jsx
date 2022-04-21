import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import SpokeIcon from '@mui/icons-material/Spoke';
import { useState } from "react"

export const BottomNavigationUI = () => {
    const [value, setValue] = useState(0)
    return (
        <BottomNavigation
            sx={{
                width: '100%',
                position: 'absolute',
                bottom: 0,
                '& .Mui-selected': {
                    '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                        color: '#42b549'
                    }
                }
            }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
            showLabels
        >
            <BottomNavigationAction label='Home' icon={<CatchingPokemonIcon />} />
            <BottomNavigationAction label='Pokedex' icon={<SpokeIcon />} />
        </BottomNavigation >
    );
}
