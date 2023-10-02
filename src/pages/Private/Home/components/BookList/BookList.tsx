import { Box, Typography } from "@mui/material";
import Carousel from "../../../../../components/Carousel/Carousel";
import Book from "../../../../../components/Book/Book";

const BookList = ({ list, title}: { list: IDataBook[], title?:string }) => {
  return (
    <Box paddingTop={4}>
      <Typography variant="h4">{title}</Typography>
      <Carousel>
        {list.map((book, index) => (
          <Book
            key={index}
            urlImage={book.urlImage}
            titulo={book.name}
            autor={book.description}
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default BookList;
