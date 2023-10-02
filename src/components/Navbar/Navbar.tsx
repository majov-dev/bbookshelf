import {
  Menu as MenuIcon,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { SidebarContext } from "../../context/ToggleDrawer";
import { Link } from "react-router-dom";
import { MouseEvent } from "react"; // Importe o tipo MouseEvent de "react"

const Navbar = () => {
  const { toggleDrawer } = useContext(SidebarContext);

  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const open = Boolean(userMenu);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenu(null);
  };

  const menuArray = [
    { label: "Profile", path: "profile" },
    { label: "Collection", path: "collection" },
  ];

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton
            aria-label="menu"
            size="large"
            color="inherit"
            onClick={toggleDrawer}
            sx={{
              display: { md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={handleMenu} variant="h6" sx={{ flexGrow: 1 }}>
            BBookshelf
          </Typography>
          <Avatar />
          <IconButton
            size="small"
            color="inherit"
            id="user-button"
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenu}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id="user-menu"
        anchorEl={userMenu}
        open={open}
        onClose={handleClose}
        disableScrollLock
        MenuListProps={{
          "aria-labelledby": "user-button avatar-user",
        }}
      >
        {menuArray.map((menuItem, index) => (
          <Typography
            key={index}
            component={Link}
            to={menuItem.path}
            color={"inherit"}
            sx={{ textDecoration: "none" }}
          >
            <MenuItem onClick={handleClose}>{menuItem.label}</MenuItem>
          </Typography>
        ))}

        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
