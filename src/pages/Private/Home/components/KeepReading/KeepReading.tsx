import BookList from "../../../../../components/BookList/BookList";
import { useUser } from "../../../../../hooks/userUser";

const KeepReading = () => {
  const { user } = useUser();

  return (
    <>
      {user?.keepReading.books.length ? (
        <BookList
          list={user?.keepReading.books as IDataBook[]}
          title="Keep Reading"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default KeepReading;
