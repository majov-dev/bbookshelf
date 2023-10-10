import { createContext, useEffect, useState } from "react";

export const LibaryContext = createContext<{
  collection: IDataBook[]; // Altere "any[]" para o tipo correto de sua coleção de dados
  searched: IDataBook[] | null;
  search: Function;
  bookSelected: IDataBook | null;
  setBookSelected: React.Dispatch<React.SetStateAction<IDataBook | null>>;
}>({
  collection: [],
  searched: null,
  search: () => { },
  bookSelected: null,
  setBookSelected: () => { },
});

const Libary = ({ children }: { children: React.ReactNode }) => {
  const [searched, setSearched] = useState<IDataBook[] | null>(null);
  const [books, setBooks] = useState<IDataBook[]>([]);

  const [bookSelected, setBookSelected] = useState<IDataBook | null>(() => {
    const storedBook = localStorage.getItem("book");
    return storedBook ? JSON.parse(storedBook) : null;
  });

  const search = (text: string) => {
    const byName = books.filter((book) => {
      const name = book.name.toLocaleLowerCase();
      const textLowerCase = text.toLocaleLowerCase();
      return name.includes(`${textLowerCase}`);
    });

    const byDescription = books.filter((book) => {
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

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((res) => {
        // console.log(res)
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      })

  }, [])
  
  // console.log(books)
  console.log("searched",searched)


  return (
    <LibaryContext.Provider
      value={{
        collection: books,
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
