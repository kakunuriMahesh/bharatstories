// import { createBrowserRouter } from "react-router-dom";

// import Content from "../Content/Content";
// import DetailStory from "../Content/DetailStory";
// import ViewContent from "../Content/ViewContent";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Content />,
//   },
//   {
//     path: "/detailstory/:name/:id",
//     element: <DetailStory />,
//   },
//   {
//     path: "/:name",
//     element: <ViewContent />,
//   },
// //   {
// //     path: "*",
// //     element: <NotFound />,
// //   },
// ]);

// export default router;


import { createBrowserRouter } from "react-router-dom";
import Layout from "../Content/Layout"; // ✅ Correct Layout path
import Content from "../Content/Content";
import DetailStory from "../Content/DetailStory";
import ViewContent from "../Content/ViewContent";
import SearchDetailStory from "../Content/SearchDetailStory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // ✅ Layout as wrapper
    children: [
      { path: "", element: <Content /> }, // ✅ Home inside Layout
      { path: "detailstory/:name/:id", element: <DetailStory /> },
      { path: "/story/:title", element: <SearchDetailStory /> },
      { path: ":name", element: <ViewContent /> },
    ],
  },
]);

export default router;
