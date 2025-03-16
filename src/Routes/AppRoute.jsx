// router.js
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Content/Layout"; // Assuming this isn't lazy-loaded
import { 
  ContentShimmer, 
  StoriesListShimmer, 
  HomeBannerShimmer 
} from "../components/Loading/storyShimmer"; // Import your shimmer components
import NotFound from "../components/NotFound"; // Keeping this as non-lazy for simplicity

// Lazy load components
const Content = lazy(() => import("../Content/Content"));
const ViewContent = lazy(() => import("../Content/ViewContent"));
const SearchDetailStory = lazy(() => import("../Content/SearchDetailStory"));
const About = lazy(() => import("../Pages/About"));
const Contact = lazy(() => import("../Pages/Contact"));

// Custom shimmer wrapper for SearchDetailStory
const SearchDetailStoryWithShimmer = () => (
  <Suspense fallback={<StoriesListShimmer />}>
    <SearchDetailStory />
  </Suspense>
);

// Custom shimmer wrapper for Content
const ContentWithShimmer = () => (
  <Suspense fallback={<ContentShimmer />}>
    <Content />
  </Suspense>
);

// Custom shimmer wrapper for ViewContent
const ViewContentWithShimmer = () => (
  <Suspense fallback={<StoriesListShimmer />}>
    <ViewContent />
  </Suspense>
);

// Custom shimmer wrapper for About
const AboutWithShimmer = () => (
  <Suspense fallback={<div className="h-screen bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
    <About />
  </Suspense>
);

// Custom shimmer wrapper for Contact
const ContactWithShimmer = () => (
  <Suspense fallback={<div className="h-screen bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
    <Contact />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <ContentWithShimmer /> },
      { path: "/home", element: <ContentWithShimmer /> },
      { path: "/about", element: <AboutWithShimmer /> },
      { path: "/contact", element: <ContactWithShimmer /> },
      { path: "/detailstory/:title", element: <SearchDetailStoryWithShimmer /> },
      { path: "/search/:title", element: <SearchDetailStoryWithShimmer /> },
      { path: "/not-found/:any", element: <NotFound /> },
      { path: "/viewstory/:name", element: <ViewContentWithShimmer /> },
    ],
  },
]);

export default router;



// FIXME: lazy loading not added
// // router.js
// import { createBrowserRouter } from "react-router-dom";
// import Layout from "../Content/Layout";
// import Content from "../Content/Content";
// import ViewContent from "../Content/ViewContent";
// import SearchDetailStory from "../Content/SearchDetailStory";
// import NotFound from "../components/NotFound";
// import About from "../Pages/About";
// import Contact from "../Pages/Contact";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />, // Layout as wrapper
//     children: [
//       { path: "", element: <Content /> },
//       { path: "/home", element: <Content /> },
//       { path: "/about", element: <About /> },
//       { path: "/contact", element: <Contact /> },
//       { path: "/detailstory/:title", element: <SearchDetailStory /> },
//       { path: "/search/:title", element: <SearchDetailStory /> },
//       { path: "/not-found/:any", element: <NotFound /> },
//       { path: "/viewstory/:name", element: <ViewContent /> },
//     ],
//   },
// ]);

// export default router;



// FIXME: Not passing stories form database to the component


// import { createBrowserRouter } from "react-router-dom";
// // import DetailStory from "../Content/DetailStory";
// import Layout from "../Content/Layout"; // ✅ Correct Layout path
// import Content from "../Content/Content";
// import ViewContent from "../Content/ViewContent";
// import SearchDetailStory from "../Content/SearchDetailStory";
// import NotFound from "../components/NotFound";
// import About from "../Pages/About";
// // import { Contact } from "lucide-react";
// import Contact from "../Pages/Contact";

// const router = createBrowserRouter([

//   {
//     path: "/",
//     element: <Layout />, // ✅ Layout as wrapper
//     children: [
//       { path: "", element: <Content /> }, // ✅ Home inside Layout
//       { path: "/home", element: <Content /> }, // ✅ Home inside Layout
//       { path: "/about", element: <About /> },
//       { path: "/contact", element: <Contact /> },
//       // { path: "/detailstory/:name/:id", element: <DetailStory /> },
//       { path: "/detailstory/:title", element: <SearchDetailStory /> },

//       { path: "/search/:title", element: <SearchDetailStory /> },
//       { path: "/not-found/:any", element: <NotFound /> },
//       { path: "/viewstory/:name", element: <ViewContent /> },
      
//     ],
//   },
// ]);

// export default router;
