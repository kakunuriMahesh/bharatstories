// router.js
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Content/Layout"; 
import { 
  ContentShimmer, 
  StoriesListShimmer, 
  HomeBannerShimmer,
  KidsShimmer,
  ToddlerShimmer
} from "../components/Loading/storyShimmer";
import NotFound from "../components/NotFound";
import ProfileSwitcher from "../Pages/ProfileSwitcher";

// Lazy load components
const Content = lazy(() => import("../Content/Content"));
const ViewContent = lazy(() => import("../Content/ViewContent"));
const SearchDetailStory = lazy(() => import("../Content/SearchDetailStory"));
const About = lazy(() => import("../Pages/About"));
const Contact = lazy(() => import("../Pages/Contact"));
const Toddler = lazy(() => import("../Content/Toddler"));
const Kids = lazy(() => import("../Content/Kids"));
const StoryDetailView = lazy(() => import("../components/StoryDetail"));

// 🔹 Suspense wrappers
const withSuspense = (Component, Fallback) => (
  <Suspense fallback={Fallback}>
    <Component />
  </Suspense>
);

const ContentWithShimmer = () =>
  withSuspense(Content, <ContentShimmer />);

const ViewContentWithShimmer = () =>
  withSuspense(ViewContent, <StoriesListShimmer />);

const SearchDetailStoryWithShimmer = () =>
  withSuspense(SearchDetailStory, <StoriesListShimmer />);

const AboutWithShimmer = () =>
  withSuspense(
    About,
    <div className="h-screen bg-gray-200 dark:bg-gray-700 animate-pulse" />
  );

const ContactWithShimmer = () =>
  withSuspense(
    Contact,
    <div className="h-screen bg-gray-200 dark:bg-gray-700 animate-pulse" />
  );

const ToddlerWithShimmer = () =>
  withSuspense(Toddler, <ToddlerShimmer />);

const KidsWithShimmer = () =>
  withSuspense(Kids, <KidsShimmer />);

const StoryDetail = () =>
  withSuspense(
    StoryDetailView,
    <div className="h-screen bg-gray-200 dark:bg-gray-700 animate-pulse" />
  );

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <ProfileSwitcher /> },
      { path: "/profile", element: <ProfileSwitcher /> },
      { path: "home", element: <ContentWithShimmer /> },
      { path: "about", element: <AboutWithShimmer /> },
      { path: "contact", element: <ContactWithShimmer /> },
      { path: "detailstory/:title", element: <SearchDetailStoryWithShimmer /> },
      { path: "search/:title", element: <SearchDetailStoryWithShimmer /> },
      { path: "not-found/:any", element: <NotFound /> },
      { path: "viewstory/:name", element: <ViewContentWithShimmer /> },

      // 🔹 Profiles
      { path: "toddler", element: <ToddlerWithShimmer /> },
      { path: "kids", element: <KidsWithShimmer /> },

      // 🔹 Shared detail page for both kids and toddler
      { path: ":type/:cardId", element: <StoryDetail /> },
    ],
  },
]);

export default router;


// TODO: fix the routes

// // router.js
// import { createBrowserRouter } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import Layout from "../Content/Layout"; // Assuming this isn't lazy-loaded
// import { 
//   ContentShimmer, 
//   StoriesListShimmer, 
//   HomeBannerShimmer 
// } from "../components/Loading/storyShimmer"; // Import your shimmer components
// import NotFound from "../components/NotFound"; // Keeping this as non-lazy for simplicity
// import StoryViewer from "../Content/StoryViewer";
// import Toddler from "../Content/Toddler";
// import StoryDetailView from "../components/StoryDetail";
// import Kids from "../Content/Kids";


// // Lazy load components
// const Content = lazy(() => import("../Content/Content"));
// const ViewContent = lazy(() => import("../Content/ViewContent"));
// const SearchDetailStory = lazy(() => import("../Content/SearchDetailStory"));
// const About = lazy(() => import("../Pages/About"));
// const Contact = lazy(() => import("../Pages/Contact")); 


// // Custom shimmer wrapper for SearchDetailStory
// const SearchDetailStoryWithShimmer = () => (
//   <Suspense fallback={<StoriesListShimmer />}>
//     <SearchDetailStory />
//   </Suspense>
// );

// // Custom shimmer wrapper for Content
// const ContentWithShimmer = () => (
//   <Suspense fallback={<ContentShimmer />}>
//     <Content />
//   </Suspense>
// );

// // Custom shimmer wrapper for ViewContent
// const ViewContentWithShimmer = () => (
//   <Suspense fallback={<StoriesListShimmer />}>
//     <ViewContent />
//   </Suspense>
// );

// // Custom shimmer wrapper for About
// const AboutWithShimmer = () => (
//   <Suspense fallback={<div className="h-screen bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
//     <About />
//   </Suspense>
// );

// // Custom shimmer wrapper for Contact
// const ContactWithShimmer = () => (
//   <Suspense fallback={<div className="h-screen bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
//     <Contact />
//   </Suspense>
// );

// const ToddlerWithShimmer = () => (
//   <Suspense fallback={<div className="h-screen bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
//     <Toddler />
//   </Suspense>
// );

// const StoryDetail = () => (
//   <Suspense fallback={<div className="h-screen bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
//     <StoryDetailView />
//   </Suspense>
// );

// const KidsWithShimmer = () => (
//   <Suspense fallback={<div className="h-screen bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
//     <Kids />
//   </Suspense>
// );

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { path: "", element: <ContentWithShimmer /> },
//       { path: "/home", element: <ContentWithShimmer /> },
//       { path: "/about", element: <AboutWithShimmer /> },
//       { path: "/contact", element: <ContactWithShimmer /> },
//       { path: "/detailstory/:title", element: <SearchDetailStoryWithShimmer /> },
//       { path: "/search/:title", element: <SearchDetailStoryWithShimmer /> },
//       { path: "/not-found/:any", element: <NotFound /> },
//       { path: "/viewstory/:name", element: <ViewContentWithShimmer /> },
//       { path: "/toddler", element: <ToddlerWithShimmer />},
//       // { path: "/toddler/:cardId", element:<StoryDetail type="toddler"/> },
//       { path: "/kids", element: <KidsWithShimmer />},
//       // { path: "/kids/:cardId", element:<StoryDetail type="kids"/> },
//       { path: "/:type/:cardId", element: <StoryDetail /> },
//       // {path: "/future-updates", element: <StoryViewer/>}, // Placeholder for future updates
//     ],
//   },
// ]);

// export default router;



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
