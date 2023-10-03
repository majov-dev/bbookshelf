import { Box } from "@mui/material";
import Suggested from "./components/Suggested/Suggested";
import KeepReading from "./components/KeepReading/KeepReading";
import Favorites from "./components/Favorites/Favorites";

const Home = () => {
  return (
    <Box className="home" color="secondary.main">
      <KeepReading />
      <Favorites />
      <Suggested />
    </Box>
  );
};

export default Home;
