import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0077b6", // Deep Blue (Main color)
        },
        secondary: {
            main: "#00b4d8", // Light Blue
        },
        background: {
            default: "#f8f9fa", // Light gray background
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 500,
            color: "#555",
        },
    },
});

export default theme;
