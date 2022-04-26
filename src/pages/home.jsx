import React from 'react'
import * as pokeapi from "../ApolloClient/client";
import { useQuery } from "@apollo/client";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { CircularProgress, Container, Grow } from '@mui/material';
import { Button } from '@mui/material';
import pokeball from '../images/pokeball.png'
import { Avatar } from '@mui/material';
import { LanguageContext } from '../containers/language';
import { useContext } from 'react';
import { Link } from 'react-router-dom'

export const Home = () => {
    const { dictionary } = useContext(LanguageContext);
    const [offset, SetOffset] = React.useState(1);

    function GetPokemons() {
        const [pokemons, setPokemons] = React.useState([]);
        const { dictionary } = useContext(LanguageContext);
        const { loading, error, data } = useQuery(pokeapi.GET_POKEMONS, {
            variables: {
                limit: 10,
                offset: offset
            },
        });
        React.useEffect(() => {
            const pokemons = JSON.parse(localStorage.getItem('pokemons'));
            if (pokemons) {
                setPokemons(pokemons);
            }
        }, []);
        let count = pokemons.reduce(function (obj, v) {
            obj[v.pokemon] = (obj[v.pokemon] || 0) + 1;
            return obj;
        }, {})
        function RenderCount(props) {
            if (props.count > 0) {
                return (
                    <Chip sx={{ ml: 2 }} color="primary" label={dictionary.owned + ' ' + props.count} />
                );
            }
        }
        if (loading) return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><CircularProgress /></Box >
        );
        if (error) return `Error! ${error.message}`;
        return (
            data.pokemons.results.map(({ name, url, image, id }) => (
                <Grid key={id} margin="10px" item xs={12} md={3}>
                    <Grow in>
                        <Card sx={{ display: 'flex' }}>
                            <img
                                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 1x`}
                                alt={name}
                                loading="lazy"
                            />

                            <Box>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography variant="subtitle2" >{name}</Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', pl: 1, pb: 2 }}>
                                    <Button component={Link} to={"/" + name} variant="outlined" size="small">{dictionary.detail_btn}</Button>
                                    <RenderCount count={count[name]} />
                                </Box>
                            </Box>

                        </Card>
                    </Grow>
                </Grid>
            ))

        );
    };
    return (
        <>
            <Container sx={{ my: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar src={pokeball} sx={{ width: 100, height: 100 }} />
                    <Typography variant="h4">
                        {dictionary.header}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {dictionary.descp}
                    </Typography>
                </Box >
            </Container>
            <Grid container direction="row" justifyContent="center">
                <GetPokemons />
            </Grid>
            <Box sx={{ display: "flex" }} justifyContent="center">
                <Button variant="text" onClick={() => {
                    let addOff = offset + 10
                    SetOffset(addOff);
                    console.log(addOff)
                }} size="small">next</Button>
            </Box>
        </>
    )
}
