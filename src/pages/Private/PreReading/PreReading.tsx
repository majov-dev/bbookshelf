import { useNavigate, useParams } from "react-router-dom";
import { useLibary } from "../../../hooks/useLibary";
import { Box, Button, Stack } from "@mui/material";
import Book from "../../../components/Book/Book";
import Description from "./components/Description/Description";

const PreReading = () => {
  const { bookSelected } = useLibary();


  const navigate = useNavigate();

  const handleRead = () => {
    navigate(`/reading`);
  };

  const handleGoBack = () => {
    navigate(`/`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          gap: { xs: 4, md: 16 },
          flexDirection: { xs: "column", md: "row" },
          mt: 8,
        }}
      >
       <Book data={bookSelected as IDataBook}/>

        <Box flexShrink={2}>
          <Description />
          <Stack direction={"row"} justifyContent={"start"} spacing={3} mt={4}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={handleRead}
            >
              Começar a ler
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              onClick={handleGoBack}
            >
              Sair
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default PreReading;
