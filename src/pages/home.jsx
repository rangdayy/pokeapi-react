import React from 'react'
import * as pokeapi from "../ApolloClient/client";
import { ApolloProvider, useQuery } from "@apollo/client";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CircularProgress, Grow } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import pokeball from '../images/pokeball.png'
import { Avatar } from '@mui/material';
import { LanguageContext } from '../containers/language';
import { useContext } from 'react';

const gqlVariables = {
    limit: 10,
    offset: 1,
};

function GetPokemons() {
    const { loading, error, data } = useQuery(pokeapi.GET_POKEMONS, {
        variables: gqlVariables,
    });
    if (loading) return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress />
        </Box >
    );
    if (error) return `Error! ${error.message}`;

    return (
        <Grid container direction="row" justifyContent="center">
            {data.pokemons.results.map(({ name, url, image, id }) => (
                <Grid key={id} margin="10px" item xs={12} md={3}>
                    <Grow in>
                        <Card sx={{ display: 'flex' }}>
                            <img
                                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 1x`}
                                alt={name}
                                loading="lazy"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h6">{name}</Typography>
                                    {/* <Typography variant="subtitle1" color="text.secondary" component="div"> Mac Miller</Typography> */}
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'end', pl: 1, pb: 1 }}>
                                    <Button size="small" color="primary">
                                        Owned
                                    </Button>
                                    <Button size="small" color="secondary">
                                        Total
                                    </Button>
                                </Box>

                            </Box>
                        </Card>
                    </Grow>

                </Grid>
            ))}
        </Grid>
    );
};

export const Home = () => {
    const { dictionary } = useContext(LanguageContext);
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={pokeball} sx={{ width: 100, height: 100 }} />
                <Typography variant="h4" component="div" gutterBottom>
                    {dictionary.header}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {dictionary.descp}
                </Typography>
            </Box >
            <GetPokemons />
        </>
    )
}