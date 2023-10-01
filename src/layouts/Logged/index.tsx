import { Container } from "@mui/material";

import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ToggleDrawer from "../../context/ToggleDrawer/ToggleDrawer";
import Navbar from "../../components/Navbar/Navbar";

const Logged = () => {
  return (
    <ToggleDrawer>
      <Navbar />
      <Sidebar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </ToggleDrawer>
  );
};

export default Logged;
