import BookList from "../../../../../components/BookList/BookList";
import { useUser } from "../../../../../hooks/userUser";

const Favorites = () => {
  const { user } = useUser();

  return (
    <>
      {user?.favorites.books.length ? (
        <BookList
          list={user?.favorites.books as IDataBook[]}
          title="Favorites"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Favorites;
