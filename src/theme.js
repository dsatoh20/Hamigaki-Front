import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#9fcfa5',
            main: '#87c38f',
            dark: '#5e8864',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e1565f',
            main: '#da2c38',
            dark: '#981e27',
            contrastText: '#000',
        },
        text: {
            primary: '#2e1c15',
            secondary: '#43291f',
            light: '#68534b',
        },
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "M PLUS Rounded 1c", "Montserrat","Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"',
        button: {
            textTramsform: "none"
        }
    },
    components: {
        MuiTextField: {
            variant: "filled"
        }
    },
    spacing: [0, 4, 8, 16, 32, 64],
})

export default theme;