import { Box, Container } from "@mui/material";

import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ToggleDrawer from "../../context/ToggleDrawer";
import Navbar from "../../components/Navbar/Navbar";

const Logged = () => {
  return (
    <ToggleDrawer>
      <Sidebar />
      <Box
        sx={{
          width: { md: `calc(100% - 240px)` },
          ml: { md: `240px` },
        }}
      >
        <Navbar />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </ToggleDrawer>
  );
};

export default Logged;
