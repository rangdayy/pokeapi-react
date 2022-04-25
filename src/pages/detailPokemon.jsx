import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { ApolloProvider, useQuery } from "@apollo/client";
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
import { Divider } from '@mui/material';

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
  return (
    <Grow in>
      <Card>
        <CardActionArea>
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
            <Button size="small" color="primary" variant="outlined">
              {dictionary.catch}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Grow >
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
  let { pokemon } = useParams();
  let data = GetDetail(pokemon)
  // console.log(data)
  if (data.pokemon) {
    return (
      <>
        <RenderDetail pokemon={pokemon} data={data} />
        <RenderMoves data={data} />
      </>
    )
  }
}
