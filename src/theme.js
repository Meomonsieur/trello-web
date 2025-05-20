import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
import { cyan, deepOrange, teal,orange, blue } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        light: {
        palette: {
            primary: teal,
            secondary: deepOrange

      }
    },
    dark: {
      palette: {
            primary: cyan,
            secondary: orange
      }
    }
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
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
        })
      }
    },
    
     MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light,
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& fieldset': {
              borderWidth: '1px !important',
            }
          })
      }
    }
  }
});

export default theme
