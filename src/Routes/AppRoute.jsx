import { createBrowserRouter } from "react-router-dom";
// import DetailStory from "../Content/DetailStory";
import Layout from "../Content/Layout"; // ✅ Correct Layout path
import Content from "../Content/Content";
import ViewContent from "../Content/ViewContent";
import SearchDetailStory from "../Content/SearchDetailStory";
import NotFound from "../components/NotFound";
import About from "../Pages/About";
// import { Contact } from "lucide-react";
import Contact from "../Pages/Contact";

const router = createBrowserRouter([

  


  {
    path: "/",
    element: <Layout />, // ✅ Layout as wrapper
    children: [
      { path: "", element: <Content /> }, // ✅ Home inside Layout
      { path: "/home", element: <Content /> }, // ✅ Home inside Layout
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      // { path: "/detailstory/:name/:id", element: <DetailStory /> },
      { path: "/detailstory/:title", element: <SearchDetailStory /> },

      { path: "/search/:title", element: <SearchDetailStory /> },
      { path: "/not-found/:any", element: <NotFound /> },
      { path: "/viewstory/:name", element: <ViewContent /> },
      
    ],
  },
]);

export default router;
