import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1f6446", // Deep Green (Main color)
        },
        secondary: {
            main: "#329c6e", // Green (Secondary color)
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
