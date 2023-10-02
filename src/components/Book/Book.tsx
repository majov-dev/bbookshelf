import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";


const Book = ({
  titulo = "Titulo do Livro",
  autor = "Nome do Autor",
  urlImage = "",
}) => {
  return (
    <Card
      sx={{ maxWidth: 256, minHeight: 570, position: "relative", margin: 0 }}
    >
      <CardMedia
        component="img"
        alt={titulo}
        image={urlImage}
        loading="eager"
        sx={{ minHeight: 400 }}
      ></CardMedia>
      <CardContent>
        <Typography variant="body1" color="secondary" fontWeight="bolder">
          {titulo.length > 25 ? `${titulo.substring(0, 25)}...` : titulo}
        </Typography>
        <Typography variant="body2" color="primary">
          {autor.length > 50 ? `${autor.substring(0, 50)}...` : autor}
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
