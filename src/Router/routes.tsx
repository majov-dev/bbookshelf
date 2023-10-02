import { createBrowserRouter } from "react-router-dom";
import Logged from "../layouts/Logged";
import NotFound from "../pages/error/NotFound.tsx/NotFound";
import Private from "../pages/Private";
import Home from "../pages/Private/Home/Home";
import Profile from "../pages/Private/Profile/Profile";
import Collection from "../pages/Private/Collection/Collection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Private Page={Logged}/>,
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
        path: "Collection",
        element:<Collection />
      },
    ],
  },
]);

export default router;
