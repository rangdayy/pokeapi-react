import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container, Grow } from '@mui/material';
import { Button } from '@mui/material';
import { LanguageContext } from '../containers/language';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

export const Pokedex = () => {
  const { dictionary } = useContext(LanguageContext);
  const [pokemons, setPokemons] = React.useState([]);

  React.useEffect(() => {
    const pokemons = JSON.parse(localStorage.getItem('pokemons'));
    if (pokemons) {
      setPokemons(pokemons);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
  }, [pokemons]);

  const deletePokemons = (name) => {
    console.log(name)
    let updatedPokemons = pokemons.filter((pokemon) => pokemon.nickname !== name);
    console.log(updatedPokemons)
    setPokemons([...updatedPokemons]);
  };
  if (pokemons.length > 0) {
    return (
      <>
        <Container sx={{ my: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4">
              {dictionary.my_pokedex}
            </Typography>
          </Box >
        </Container>
        <Grid container direction="row" justifyContent="center">
          {pokemons.map(({ pokemon, nickname, img }) => (
            <Grid key={nickname} margin="10px" item xs={12} md={3}>
              <Grow in>
                <Card sx={{ display: 'flex' }}>
                  <img
                    src={`${img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 1x`}
                    alt={nickname}
                    loading="lazy"
                  />

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography variant="subtitle2" >{nickname}</Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', pl: 1, pb: 2 }}>
                      <Button component={Link} to={"/" + pokemon} variant="outlined" size="small" sx={{ ml: 1 }}>{dictionary.detail_btn}</Button>
                      <Button sx={{ ml: 2 }} onClick={() => { deletePokemons(nickname) }} color="error" variant="outlined" size="small">{dictionary.release}</Button>
                    </Box>
                  </Box>
                </Card>
              </Grow>

            </Grid>
          ))}
        </Grid>
      </>
    )
  } else {
    return (
      <Container sx={{ my: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MonitorHeartIcon  color="primary" sx={{ fontSize: 60, m:2 }} />
          <Typography variant="h4" sx={{m:1}}>
            {dictionary.pokedex_empty}
          </Typography>
          <Typography align='center' variant="subtitle2" color="text.secondary">
            {dictionary.pokedex_empty_descp}
          </Typography>
        </Box >
      </Container>
    )
  }

}
