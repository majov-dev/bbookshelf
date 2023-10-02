interface IUser {
  id: string;
  name: string;
  login: IUserLogin;
  favorites: IUserFavorites;
  keepReading: IUserReading;
}
