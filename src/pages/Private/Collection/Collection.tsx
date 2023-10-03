import { Grid } from "@mui/material";
import Book from "../../../components/Book/Book";
import { useLibary } from "../../../hooks/useLibary";

const Collection = ({}) => {
  const { collection, searched } = useLibary();

  const books = searched.length ? searched : collection;

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={{ xs: 1, sm: 2, md: 4 }}
      columns={60}
      marginY={4}
    >
      {books.map((dataBook, index) => (
        <Grid
          key={index}
          component={"div"}
          item
          xs={60}
          sm={30}
          md={20}
          lg={15}
          xl={12}
          color={"white"}
          sx={{
            display: { xs: "flex", md: "block" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Book data={dataBook} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Collection;
