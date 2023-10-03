import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLibary } from "../../hooks/useLibary";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { useUser } from "../../hooks/userUser";

const Book = ({ data }: { data: IDataBook }) => {
  const navigate = useNavigate();
  const { setBookSelected } = useLibary();
  const { user, setUser } = useUser();

  const favorites = new Set(user?.favorites.bookIds);

  const isFavorite = favorites.has(Number(data.id));

  const handleCardClick = () => {
    setBookSelected(data);

    navigate(`/prereading`);
  };
  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isFavorite) {
      const othesFavoriteIds = user?.favorites.bookIds.filter(
        (id) => id !== Number(data.id)
      );

      const othesFavoriteBooks = user?.favorites.books.filter(
        (book) => book.id !== data.id
      );

      setUser({
        ...(user as IUser),
        favorites: {
          books: [...(othesFavoriteBooks as IDataBook[])],
          bookIds: [...(othesFavoriteIds as number[])],
        },
      });
    } else {
      setUser({
        ...(user as IUser),
        favorites: {
          books: [...(user?.favorites.books as IDataBook[]), data],
          bookIds: [...(user?.favorites.bookIds as number[]), Number(data.id)],
        },
      });
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        maxWidth: 256,
        minHeight: 570,
        position: "relative",
        cursor: "pointer",
      }}
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
        onClick={handleFavoriteClick}
      >
        {isFavorite ? (
          <Bookmark color="secondary" />
        ) : (
          <BookmarkBorder color="primary" />
        )}
      </IconButton>
    </Card>
  );
};

export default Book;
