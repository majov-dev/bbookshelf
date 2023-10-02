import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLibary } from "../../hooks/useLibary";

const Book = ({ data }: { data: IDataBook }) => {
  const navigate = useNavigate();
  const { setBookSelected } = useLibary();

  const handleCardClick = () => {
    setBookSelected(data);

    navigate(`/prereading`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{ maxWidth: 256, minHeight: 570, position: "relative", margin: 0 }}
    >
      <CardMedia
        component="img"
        alt={data.name}
        image={data.urlImage}
        loading="eager"
        sx={{ minHeight: 400 }}
      ></CardMedia>
      <CardContent>
        <Typography variant="body1" color="secondary" fontWeight="bolder">
          {data.name.length > 25
            ? `${data.name.substring(0, 25)}...`
            : data.name}
        </Typography>
        <Typography variant="body2" color="primary">
          {data.description.length > 50
            ? `${data.description.substring(0, 50)}...`
            : data.description}
        </Typography>
      </CardContent>

      <IconButton
        sx={{
          position: "absolute",
          bottom: "8px",
          right: "8px",
        }}
      ></IconButton>
    </Card>
  );
};

export default Book;
