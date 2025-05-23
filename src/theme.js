import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
// import { cyan, deepOrange, teal,orange, blue } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
    //     light: {
    //     palette: {
    //         primary: teal,
    //         secondary: deepOrange
    //   }
    // },
    // dark: {
    //   palette: {
    //         primary: cyan,
    //         secondary: orange
    //   }
    // }
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderColor: '8px'
          },
          '*::-webkit-scollbar-thumb:hover': {
            backgroundColor: '#95a5a6',
            borderColor: '4px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': {
            backgroundColor: 'transparent',
            borderWidth: '0.5px',
            borderColor: 'white',
          },
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {fontSize: '0.875rem'}
      }
    },
    
     MuiOutlinedInput: {
      styleOverrides: {
        root: {
            fontSize: '0.875rem',
            '& fieldset': {borderWidth: '1px !important'},
            '&:hover fieldset': {borderWidth: '2px !important'},
            '&.Mui-focused fieldset': {borderWidth: '1px !important', cusor: 'pointer'},
        }
      }
    }
  }
});

export default theme
