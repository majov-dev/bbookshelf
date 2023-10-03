import {
  Box,
  IconButton,
  Link as MuiLink,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Permanent from "./Permanent/Permanent";
import Temporary from "./Temporary/Temporary";
import { AccountBox, GridOn, Home } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "../../context/ToggleDrawer";
import { useContext } from "react";

const menuItems = [
  { text: "Home", icon: <Home />, link: "/" },
  { text: "Collection", icon: <GridOn />, link: "/collection" },
  { text: "Profile", icon: <AccountBox />, link: "/profile" },
];

const Sidebar = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const location = useLocation();

  console.log(location.pathname)
  const content = (
    <Box sx={{ minWidth: "240px", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" color="initial" sx={{ ml: 2 }}>
          Menu
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <MuiLink
            component={Link}
            to={item.link}
            underline="none"
            color="inherit"
            key={index}
          >
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={toggleDrawer}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </MuiLink>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Temporary>{content}</Temporary>
      <Permanent>{content}</Permanent>
    </>
  );
};

export default Sidebar;
