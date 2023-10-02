interface IUserReading {
  books: IDataBook[];
  reading: IReading[];
}

interface IReading {
  id: string;
  pag: number;
}
