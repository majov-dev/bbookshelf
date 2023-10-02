import { Box, Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import {
  Alert,
  AlertColor,
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Modal,
  Paper,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { AuthContext } from "../../context/Auth";

const Access = () => {
  const { signup, signin } = useContext(AuthContext);
  const delay = 1000;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [messageType, setMessageType] = useState<AlertColor>("info");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDuration, setAlertDuration] = useState(3000);

  const [inProgress, setInProgress] = useState(false);

  const [openLoading, setOpenLoading] = useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertMessage(false);
  };

  const handleOpenRegistration = () => {
    setIsLogin(false);
    setOpenModal(true);
  };

  const handleCloseRegistration = () => {
    setName("");
    setEmail("");
    setPassword("");
    setOpenModal(false);
  };

  const handleOpenLogin = () => {
    setIsLogin(true);
    setOpenModal(true);
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignup = () => {
    setOpenLoading(true);
    setInProgress(true);

    setTimeout(() => {
      const registration = signup(name, { email, password });

      setIsLogin(true);
      handleRegistered(registration.success, registration.message);
      setInProgress(false);
      setOpenLoading(false);
    }, delay);
  };

  const handleSignin = () => {
    setOpenLoading(true);
    setOpenModal(false);

    setTimeout(() => {
      if (signin({ email, password })) {
        // Handle successful login
      } else {
        setOpenModal(true);
        handleLoginError();
      }
      setOpenLoading(false);
    }, delay);
  };

  const handleLoginError = () => {
    setMessageType("error");
    setAlertMessage("Incorrect email or password. Please try again.");
    setOpenAlertMessage(true);
  };

  const handleRegistered = (success: boolean, message: string) => {
    const type = success ? "success" : "error";
    setMessageType(type);
    setAlertMessage(message);
    setOpenAlertMessage(true);
    setAlertDuration(6000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isLogin) {
      handleSignin();
    } else {
      handleSignup();
    }
  };

  return (
    <>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar
            sx={{ justifyContent: { xs: "center", sm: "space-between" } }}
          >
            <Typography variant="h4" color={"primary"}>
              BBookshelf
            </Typography>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpenLogin}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleOpenRegistration}
              >
                Sign Up
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, display: { xs: "block", sm: "none" } }}
      >
        <Container>
          <Toolbar>
            <Stack direction={"row"} spacing={1} useFlexGap width={"100%"}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleOpenLogin}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleOpenRegistration}
              >
                Sign Up
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg">
          <Stack
            sx={{
              alignItems: "center",
              width: "100%",
              pt: "128px",
            }}
            spacing={4}
          >
            <Paper
              sx={{ bgcolor: "primary.main", px: { xs: 4, md: 8 }, py: 4 }}
            >
              <Typography
                variant="h2"
                color={"secondary"}
                sx={{ fontSize: { xs: "5vw", lg: "3vw" } }}
              >
                Brazil's Largest Book Club
              </Typography>
            </Paper>

            <Paper
              sx={{ bgcolor: "secondary.main", px: { xs: 4, md: 8 }, py: 2 }}
            >
              <Typography
                variant="h4"
                color={"primary"}
                sx={{ fontSize: { xs: "3vw", lg: "2vw" } }}
              >
                Access our world of digital books.
              </Typography>
            </Paper>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpenRegistration}
            >
              Sign Up for LeiaMais!
            </Button>
          </Stack>
        </Container>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseRegistration}
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
            maxWidth="sm"
            sx={{
              position: "relative",
              bgcolor: "background.default",
              borderRadius: 1,
              boxShadow: 24,
              p: 4,
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
              onClick={handleCloseRegistration}
              aria-label="Close Access"
            >
              <Cancel fontSize="small" color="primary"></Cancel>
            </IconButton>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    textAlign={"center"}
                    color={"primary"}
                  >
                    {isLogin ? "Login" : "Sign Up"}
                  </Typography>
                </Grid>
                {!isLogin ? (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      value={name}
                      autoComplete="off"
                      type="text"
                      label="Name"
                      onChange={handleName}
                      required
                    ></TextField>
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={email}
                    autoComplete="off"
                    type="email"
                    label="Email"
                    onChange={handleEmail}
                    required
                    helperText={"example@example.com"}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={password}
                    autoComplete="off"
                    type="password"
                    label="Password"
                    onChange={handlePassword}
                    required
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    {isLogin ? "Login" : "Sign Up"}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={isLogin ? handleOpenRegistration : handleOpenLogin}
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </Button>
                </Grid>
                <Grid item xs={12} height={2}>
                  {inProgress && <LinearProgress />}
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Modal>
      <Snackbar
        open={openAlertMessage}
        autoHideDuration={alertDuration}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert severity={messageType} variant="filled" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={openLoading}
      >
        {isLogin && <CircularProgress color="secondary" />}
      </Backdrop>
    </>
  );
};

export default Access;
