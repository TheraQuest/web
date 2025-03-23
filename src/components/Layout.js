import { Box, Container } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex" }}>
                <Sidebar />
                <Container sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    {children} {/* This will be the content of each page */}
                </Container>
            </Box>
        </>
    );
}

export default Layout;
