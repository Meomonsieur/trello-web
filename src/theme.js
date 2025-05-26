import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
// import { cyan, deepOrange, teal,orange, blue } from '@mui/material/colors'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '50px'

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT
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
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem',
          },
        }
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
