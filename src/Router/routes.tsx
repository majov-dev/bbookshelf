import { createBrowserRouter } from "react-router-dom";
import Logged from "../layouts/Logged";
import NotFound from "../pages/error/NotFound.tsx/NotFound";
import Private from "../pages/Private";
import Home from "../pages/Private/Home/Home";

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
    ],
  },
]);

export default router;
