import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { client } from "./ApolloClient/client";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from '@mui/material';
// import { theme } from './components/theme';
import { createTheme } from '@mui/material';
import App from './App';

const theme = createTheme({
  palette: {
      type: 'light',
      primary: {
        main: '#42b549',
      },
      secondary: {
        main: '#45794a',
      },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
