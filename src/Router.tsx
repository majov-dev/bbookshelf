import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Logged from "./layouts/Logged";
import { Typography } from "@mui/material";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Logged/>}>
            <Route index element={<Typography variant="h1" color="primary">BBookshel</Typography>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
