import { createContext, useEffect, useState } from "react";
import data from "./../../data/books.json";

export const LibaryContext = createContext<{
  collection: IDataBook[]; // Altere "any[]" para o tipo correto de sua coleção de dados
  searched: IDataBook[];
  setSearched: React.Dispatch<React.SetStateAction<IDataBook[]>>;
  bookSelected: IDataBook | null;
  setBookSelected: React.Dispatch<React.SetStateAction<IDataBook | null>>;
}>({
  collection: [],
  searched: [],
  setSearched: () => {},
  bookSelected: null,
  setBookSelected: () => {},
});

const Libary = ({ children }: { children: React.ReactNode }) => {
  const [searched, setSearched] = useState<IDataBook[]>([]);

  const [bookSelected, setBookSelected] = useState<IDataBook | null>(() => {
    const storedBook = localStorage.getItem("book");
    return storedBook ? JSON.parse(storedBook) : null;
  });

  useEffect(() => {
    if (bookSelected) {
      localStorage.setItem("book", JSON.stringify(bookSelected));
    } else {
      localStorage.removeItem("book");
    }
  }, [bookSelected]);

  return (
    <LibaryContext.Provider
      value={{
        collection: data,
        searched,
        setSearched,
        bookSelected,
        setBookSelected,
      }}
    >
      {children}
    </LibaryContext.Provider>
  );
};

export default Libary;
