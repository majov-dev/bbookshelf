import { createContext, useEffect, useState } from "react";
import data from "./../../data/books.json";

export const LibaryContext = createContext<{
  collection: IDataBook[]; // Altere "any[]" para o tipo correto de sua coleção de dados
  searched: IDataBook[] | null;
  search: Function;
  bookSelected: IDataBook | null;
  setBookSelected: React.Dispatch<React.SetStateAction<IDataBook | null>>;
}>({
  collection: [],
  searched: [],
  search: () => {},
  bookSelected: null,
  setBookSelected: () => {},
});

const Libary = ({ children }: { children: React.ReactNode }) => {
  const [searched, setSearched] = useState<IDataBook[] | null>(null);

  const [bookSelected, setBookSelected] = useState<IDataBook | null>(() => {
    const storedBook = localStorage.getItem("book");
    return storedBook ? JSON.parse(storedBook) : null;
  });

  const search = (text: string) => {
    const byName = data.filter((book) => {
      const name = book.name.toLocaleLowerCase();
      const textLowerCase = text.toLocaleLowerCase();
      return name.includes(`${textLowerCase}`);
    });

    const byDescription = data.filter((book) => {
      const descricao = book.description.toLocaleLowerCase();
      const textLowerCase = text.toLocaleLowerCase();
      return descricao.includes(`${textLowerCase}`);
    });

    setSearched([...byName, ...byDescription]);
  };

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
        search,
        bookSelected,
        setBookSelected,
      }}
    >
      {children}
    </LibaryContext.Provider>
  );
};

export default Libary;
