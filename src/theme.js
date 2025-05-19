import { createTheme } from '@mui/material/styles'
import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
import { cyan, deepOrange, teal,orange } from '@mui/material/colors'
import { appBarClasses } from '@mui/material';

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: '48px',
        boardBarHeight: '58px',
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
    },
  },
  // ...other properties
});

export default theme
