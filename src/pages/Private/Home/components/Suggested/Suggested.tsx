import { useContext } from "react";
import { LibaryContext } from "../../../../../context/Libary";
import BookList from "../BookList/BookList";

const Suggested = () => {
  const { collection, searched } = useContext(LibaryContext);

  const suggested = searched.length ? searched : collection;

  return (
    <BookList list={suggested} title="Suggested"/>
  );
};

export default Suggested;
