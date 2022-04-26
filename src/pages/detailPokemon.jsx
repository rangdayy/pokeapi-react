import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useQuery } from "@apollo/client";
import { CircularProgress, Grow } from '@mui/material';
import * as pokeapi from "../ApolloClient/client";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeightIcon from '@mui/icons-material/Height';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useContext } from 'react';
import { LanguageContext } from '../containers/language';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CatchingPokemon from '@mui/icons-material/CatchingPokemon';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

function GetDetail(pokemon) {
  const { loading, error, data } = useQuery(pokeapi.GET_DETAIL, {
    variables: {
      name: pokemon
    }
  });
  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><CircularProgress /></Box >
  );
  if (error) return `Error! ${error.message}`;
  return data;
};

function RenderDetail(props) {
  const { dictionary } = useContext(LanguageContext);
  const [open, setOpen] = React.useState(false);
  const [fail, setFail] = React.useState(false);
  const [pokemons, setPokemons] = React.useState([]);
  const [newpokemon, setNewPokemon] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClickOpen = () => {
    setSuccess(false)
    if (Math.random() > 0.5) {
      setOpen(true);
      setFail(false)
    } else {
      setFail(true)
    }

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let check_id = pokemons.filter((pokemon) => pokemon.nickname === newpokemon)
    if (newpokemon && check_id.length === 0) {
      setError(false);
      let newPokemon = {
        nickname: newpokemon,
        pokemon: props.pokemon,
        img: props.data.pokemon.sprites.front_default
      };
      setPokemons([newPokemon, ...pokemons]);
      setSuccess(true);
      handleClose()
    } else {
      setError(true);
    }
    setNewPokemon('');
  };

  React.useEffect(() => {
    const pokemons = JSON.parse(localStorage.getItem('pokemons'));
    if (pokemons) {
      setPokemons(pokemons);
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
  }, [pokemons]);
  return (
    <>
      <Grow in>
        <Card>
          <CardActionArea>
            <Box sx={{ width: '100%' }}>
              <Collapse in={fail}>
                <Alert severity="error" onClick={() => {
                  setFail(false);
                }}>
                  {dictionary.failed_catch}
                </Alert>
              </Collapse>
              <Collapse in={success}>
                <Alert severity="success" onClick={() => {
                  setSuccess(false);
                }}>
                  {dictionary.success_catch}
                </Alert>
              </Collapse>
            </Box>
            <Box sx={{ display: 'flex' }} justifyContent="center">
              <img
                src={`${props.data.pokemon.sprites.front_default}?w=250&h=250&fit=crop&auto=format`}
                srcSet={`${props.data.pokemon.sprites.front_default}?w=250&h=250&fit=crop&auto=format&dpr=2 1x`}
                alt={props.pokemon}
                loading="lazy"
              />
            </Box>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.pokemon}
              </Typography>
              <Stack direction="row" spacing={1}>
                {props.data.pokemon.types.map(({ id, type }) => (
                  <Chip key={type.name} label={type.name} variant="outlined" />
                ))}
              </Stack>
              <List sx={{ width: '100%' }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <HeightIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={dictionary.det_height} secondary={props.data.pokemon.height} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FitnessCenterIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={dictionary.det_weight} secondary={props.data.pokemon.weight} />
                </ListItem>
              </List>
              <Typography variant="subtitle2" color="text.secondary">
                {dictionary.catch_phrase}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Box sx={{ display: 'flex', pl: 1, pb: 2 }}>
              <Button size="small" color="primary" variant="outlined" onClick={handleClickOpen}>
                {dictionary.catch}
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grow >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit} >
          <DialogTitle id="alert-dialog-title">
            <Box sx={{ display: "flex" }} justifyContent="center">
              <CatchingPokemon color="primary" />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} justifyContent="center">
              <Typography variant='subtitle2'>{dictionary.catch_success}</Typography>
              <TextField
                fullWidth
                id="pokemon_name"
                label={dictionary.name}
                variant="standard"
                error={Boolean(error)}
                helperText={dictionary.error_name}
                onChange={(e) => setNewPokemon(e.target.value)} />
            </Stack>

          </DialogContent>
          <DialogActions>
            <Button size="small" type="submit" variant="contained" autoFocus>
              {dictionary.save}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </>
  )
}

function RenderMoves(props) {
  const { dictionary } = useContext(LanguageContext);
  return (
    <Grow in>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{dictionary.det_moves}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav">
            {props.data.pokemon.moves.map(({ id, move }) => (
              <ListItemButton key={move.name} >
                <Typography variant="subtitle2" color="text.secondary">
                  {move.name}
                </Typography>

              </ListItemButton>
            ))}
          </List>

        </AccordionDetails>
      </Accordion>
    </Grow>
  )
}

export const DetailPokemon = () => {
  let { pokemon } = useParams()
  let data = GetDetail(pokemon)
  if (data.pokemon) {
    return (
      <>
        <RenderDetail pokemon={pokemon} data={data} />
        <RenderMoves data={data} />
      </>
    )
  }
}
