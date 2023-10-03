import { Box } from "@mui/material";
import Suggested from "./components/Suggested/Suggested";
import KeepReading from "./components/KeepReading/KeepReading";

const Home = () => {
  return (
    <Box className="home" color="secondary.main">
      <KeepReading />
      <Suggested />
    </Box>
  );
};

export default Home;
