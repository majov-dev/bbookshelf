import { createTheme } from "@mui/material";
import { IColors } from "./IColors";

const colors: IColors = {
  primary: "#003249",
  secondary: "#9ad1d4",
};

export const themeDefault = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    mode:'dark'
  },
});
