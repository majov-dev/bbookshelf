import {
  Menu as MenuIcon,
  KeyboardArrowUp,
  KeyboardArrowDown,
  SearchOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/ToggleDrawer";
import { Link, useLocation } from "react-router-dom";
import { MouseEvent } from "react"; // Importe o tipo MouseEvent de "react"
import { AuthContext } from "../../context/Auth";
import { Search } from "../Search/Search.styled";
import { useLibary } from "../../hooks/useLibary";
const Navbar = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const { signout } = useContext(AuthContext);
  const { search } = useLibary();

  const location = useLocation();

  const [searchText, setSearchText] = useState("");

  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const open = Boolean(userMenu);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenu(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    search(searchText);
  }, [searchText]);

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
          <Typography onClick={handleMenu} variant="h6">
            BBookshelf
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          {location.pathname === "/collection" && (
            <Search
              id="search"
              size="small"
              label=""
              variant="outlined"
              placeholder="Pesquisar"
              sx={{ display: { xs: "none", md: "block", bgcolor: "white" } }}
              value={searchText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          )}

          <Box sx={{ flexGrow: 1 }}></Box>
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

        <MenuItem onClick={signout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
