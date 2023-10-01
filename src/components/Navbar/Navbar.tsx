import { Menu } from "@mui/icons-material";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { SidebarContext } from "../../context/ToggleDrawer/ToggleDrawer";

const Navbar = () => {
  const { toggleDrawer } = useContext(SidebarContext);

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <IconButton
          aria-label="menu"
          size="large"
          color="inherit"
          onClick={toggleDrawer}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BBookshelf
        </Typography>
        <Avatar />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
