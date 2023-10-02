import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Permanent from "./Permanent/Permanent";
import Temporary from "./Temporary/Temporary";
import { Home } from "@mui/icons-material";

const Sidebar = () => {
  const content = (
    <Box sx={{ minWidth: "240px", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" color="initial" sx={{ ml: 2 }}>
          Menu
        </Typography>
      </Box>
      <List>
        <ListItem key={"home"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="HOME"></ListItemText>
          </ListItemButton>
        </ListItem>
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
