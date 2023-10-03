import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const Search = styled(TextField)`
  & .MuiInputBase-root {
    color: #fff;
    border: 1px solid #fff;
    width: 50ch;
  }
  & .MuiInputAdornment-root {
    color: inherit;
  }
`;
