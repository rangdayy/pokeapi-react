import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
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


