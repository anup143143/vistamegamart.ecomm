import { createBrowserRouter } from "react-router-dom";

import All from "../Pages/All";
import Platforms from "../Pages/Platfroms";
import Tags from "../Pages/Tags";
import Developers from "../Pages/Developers";
import Publishers from "../Pages/Publishers";
import Stores from "../Pages/Stores";
import Layout from "./Layout";
import Gamedetails from "./Gamedetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <All />, // ✅ ONLY THIS (no duplicate)
      },
      {
        path: "platforms",
        element: <Platforms />,
      },
      {
        path: "tags",
        element: <Tags />,
      },
      {
        path: "developers",
        element: <Developers />,
      },
      {
        path: "publishers",
        element: <Publishers />,
      },
      {
        path: "stores",
        element: <Stores />,
      },
      {
        path: "game/:id",
        element: <Gamedetails />, // ✅ FIXED PATH
      },
    ],
  },
]);

export default router;