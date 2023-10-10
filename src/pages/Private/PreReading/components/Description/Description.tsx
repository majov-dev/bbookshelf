import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useLibary } from "../../../../../hooks/useLibary";

const Description = () => {
  const { bookSelected } = useLibary();

  return (
    <Stack spacing={2} color={"primary.main"}>
      <Box>
        <Typography variant="h5" color={"secondary"}>
          Synopsis
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "justify" }}>
          {bookSelected?.synopsis}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" color={"secondary"}>
          Description
        </Typography>
        <Typography variant="body1">{bookSelected?.description}</Typography>
      </Box>
      <Box>
        <Typography variant="h5" color={"secondary"}>
          Genre
        </Typography>
        <Typography variant="body1">{bookSelected?.genre}</Typography>
      </Box>
    </Stack>
  );
};

export default Description;
