import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { themeDefault } from "../../theme/default";



interface ThemeProps {
  children: React.ReactNode;
}

function Theme({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={themeDefault}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Theme;
