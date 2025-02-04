import { createBrowserRouter } from "react-router-dom";

import Content from "../Content/Content";
import DetailStory from "../Content/DetailStory";
import ViewContent from "../Content/ViewContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Content />,
  },
  {
    path: "/detailstory/:name/:id",
    element: <DetailStory />,
  },
  {
    path: "/:name",
    element: <ViewContent />,
  },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
]);

export default router;
