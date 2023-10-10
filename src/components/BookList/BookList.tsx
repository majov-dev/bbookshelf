import { Box, Typography } from "@mui/material";
import Carousel from "../Carousel/Carousel";
import Book from "../Book/Book";

const BookList = ({ list, title}: { list: IDataBook[], title?:string }) => {
  return (
    <Box paddingTop={4}>
      <Typography variant="h4">{title}</Typography>
      <Carousel>
        {list.map((book, index) => (
          <Book
            key={index}
            data={book}
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default BookList;
