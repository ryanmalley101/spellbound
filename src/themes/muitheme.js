import {createTheme} from '@mui/material/styles';


const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00647a',
      light: '#0096b8',
      dark: '#00323d',
    },
    secondary: {
      main: '#231123',
    },
    error: {
      main: '#FF715B',
    },
    warning: {
      main: '#C97D60',
    },
    info: {
      main: '#00a1fd',
    },
  },
})

export default themeOptions