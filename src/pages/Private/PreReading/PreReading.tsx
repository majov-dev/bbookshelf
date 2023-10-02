import { useNavigate } from "react-router-dom";
import { useLibary } from "../../../hooks/useLibary";
import {
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Book from "../../../components/Book/Book";
import Description from "./components/Description/Description";
import { useState } from "react";
import { useUser } from "../../../hooks/userUser";
import { Cancel } from "@mui/icons-material";

const PreReading = () => {
  const { bookSelected } = useLibary();
  const { user, setUser } = useUser();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const navigate = useNavigate();

  const handleRead = () => {
    navigate(`/reading`);
  };

  const handleGoBack = () => {
    navigate(`/`);
  };

  const isReading = user?.keepReading.reading.find(
    (book) => book.id === bookSelected?.id
  );

  const deleteReading = ()=>{
    const books = user?.keepReading.books.filter(
      (book) => book.id !== bookSelected?.id
    );
    const readings = user?.keepReading.reading.filter(
      (book) => book.id !== bookSelected?.id
    );
    setUser({...(user as IUser), keepReading:{
      books: [...books as IDataBook[]],
      reading: [...readings as IReading[]]
    }})

    handleCloseModal();
  }

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
        <Book data={bookSelected as IDataBook} />

        <Box flexShrink={2}>
          <Description />
          <Stack
            direction={{ md: "row" }}
            justifyContent={"start"}
            mt={4}
            gap={2}
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleRead}
            >
              {isReading ? "Continuar leitura" : "Começar a ler"}
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={handleGoBack}
            >
              Sair
            </Button>
            {isReading && (
              <Button
                size="large"
                variant="outlined"
                color="warning"
                onClick={handleOpenModal}
              >
                Excluir leitura
              </Button>
            )}
          </Stack>
        </Box>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              position: "relative",
              bgcolor: "Background",
              borderRadius: 1,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" color="primary">
              Do you want to delete the reading?
            </Typography>
            <Typography variant="h6" color="error">
              Your progress will be lost, and the information for this book will
              be removed from the reports.
            </Typography>
            <Stack gap={4} direction={{ md: "row" }} mt={2}>
              <Button fullWidth variant="contained" color="error" onClick={deleteReading}>
                Delete
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
              >
                Go back
              </Button>
            </Stack>
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
              onClick={handleCloseModal}
              aria-label="Close Access"
            >
              <Cancel fontSize="small" color="primary"></Cancel>
            </IconButton>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default PreReading;
