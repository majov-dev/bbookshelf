import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/error/NotFound.tsx/NotFound";
import Private from "../pages/Private";
import Home from "../pages/Private/Home/Home";
import Profile from "../pages/Private/Profile/Profile";
import Collection from "../pages/Private/Collection/Collection";
import PreReading from "../pages/Private/PreReading/PreReading";
import Reading from "../pages/Private/Reading/Reading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Private />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element:<Home />
      },
      {
        path: "profile",
        element:<Profile />
      },
      {
        path: "collection",
        element:<Collection />
      },
      {
        path: "prereading",
        element:<PreReading />
      },
    ],
  },
]);

export default router;
