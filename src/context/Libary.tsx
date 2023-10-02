import { createContext, useState } from "react";
import data from "./../../data/books.json";

export const LibaryContext = createContext<{
  collection: IDataBook[]; // Altere "any[]" para o tipo correto de sua coleção de dados
  searched: IDataBook[];
  setSearched: React.Dispatch<React.SetStateAction<IDataBook[]>>;

}>({ collection: [], searched: [], setSearched: () => {} });

const Libary = ({ children }: { children: React.ReactNode }) => {
  const [searched, setSearched] = useState<IDataBook[]>([]);

  return (
    <LibaryContext.Provider
      value={{
        collection: data,
        searched,
        setSearched,
      }}
    >
      {children}
    </LibaryContext.Provider>
  );
};

export default Libary;
