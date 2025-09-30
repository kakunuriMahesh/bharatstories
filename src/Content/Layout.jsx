// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Outlet } from "react-router-dom";
// import { setMenuState } from "../Store/languageSlice";

// const Layout = () => {
//   // Menu state
//   const menuState = useSelector((state) => state.language.menuState);
//   const dispatch = useDispatch();

//   // Stories states
//   const [stories, setStories] = useState([]);
//   const [filteredStories, setFilteredStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch stories
//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('https://bharat-story-backend.vercel.app/api/stories');
//         setStories(response.data);
//         setFilteredStories(response.data);
//       } catch (err) {
//         setError('Failed to fetch stories');
//         console.error('Failed to fetch stories:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStories();
//   }, []);

//   console.log(stories, "database");

//   const handleMenu = () => {
//     console.log("menuState", menuState);
//     if (menuState) dispatch(setMenuState(false));
//   };

//   return (
//     <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
//       {error ? (
//         <div className="min-h-screen flex items-center justify-center">
//           <p className="text-red-500 text-xl">{error}</p>
//         </div>
//       ) : (
//         <div>
//           <Navbar />
//           <main onClick={handleMenu} className="min-h-screen pt-[100px]">
//             <Outlet context={{
//               stories,
//               setStories,
//               filteredStories,
//               setFilteredStories,
//               loading,
//               setLoading
//             }} />
//           </main>
//           <Footer />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Layout;

import { useState, useEffect, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { setMenuState } from "../Store/languageSlice";
import {
  HomeBannerShimmer,
  StoryShimmer,
  KidsShimmer,
  ToddlerShimmer,
} from "../components/Loading/storyShimmer";
import ReaderControls from "./ReaderControls";

// Create a context for stories
const StoriesContext = createContext();

// Custom hook to use stories context
export const useStoriesContext = () => {
  const context = useContext(StoriesContext);
  if (!context) {
    throw new Error('useStoriesContext must be used within a StoriesProvider');
  }
  return context;
};

const Layout = () => {
  // Existing states
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const menuState = useSelector((state) => state.language.menuState);
  const dispatch = useDispatch();
  const location = useLocation();
  const firstSegment = location.pathname.split("/")[1]; // "detailstory"
  console.log(firstSegment, "checkpathname");

  // New states for stories
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Combined useEffect for images loading and stories fetching
  useEffect(() => {
    // Image loading logic
    const images = document.querySelectorAll("img");
    const imagePromises = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) resolve();
        else img.onload = resolve;
      });
    });

    // Stories fetching logic
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://bharat-story-backend.vercel.app/api/stories"
        );
        setStories(response.data);
        setFilteredStories(response.data);
      } catch (err) {
        setError("Failed to fetch stories");
        console.error("Failed to fetch stories:", err);
      } finally {
        setLoading(false);
      }
    };

    // Execute both
    Promise.all([...imagePromises]).then(() => setIsImagesLoaded(true));
    fetchStories();
  }, []);
  console.log(stories, "database");

  const handleMenu = () => {
    console.log("menuState", menuState);
    if (menuState) dispatch(setMenuState(false));
  };

  // Pass stories to child components through Outlet
  const renderContent = () => {
    // Show shimmer while loading (but not for ProfileSwitcher)
    if (loading) {
      // Get the current route to show appropriate shimmer
      const currentPath = location.pathname;
      
      // Don't show shimmer for ProfileSwitcher routes
      if (currentPath === '/' || currentPath === '/profile') {
        return (
          <div>
            <Navbar />
            <main onClick={handleMenu} className="min-h-screen pt-[100px]">
              <Outlet
                context={{
                  stories,
                  setStories,
                  filteredStories,
                  setFilteredStories,
                  loading,
                  setLoading,
                }}
              />
            </main>
            <Footer />
          </div>
        );
      }
      
      let shimmerComponent;
      
      if (currentPath === '/kids') {
        shimmerComponent = <KidsShimmer />;
      } else if (currentPath === '/toddler') {
        shimmerComponent = <ToddlerShimmer />;
      } else {
        // Default shimmer for other pages
        shimmerComponent = (
          <div className="mt-[10px] px-[20px] pb-[20px]">
            <HomeBannerShimmer />
            <div className="mt-6">
              <StoryShimmer />
            </div>
          </div>
        );
      }
      
      return (
        <div>
          <Navbar />
          <main onClick={handleMenu} className="min-h-screen pt-[100px]">
            {shimmerComponent}
          </main>
          <Footer />
        </div>
      );
    }

    // Show error if there's an error
    if (error) {
      return (
        <div>
          <Navbar />
          <main onClick={handleMenu} className="min-h-screen pt-[100px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 text-xl mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    return (
      <div>
        <Navbar />
        <main onClick={handleMenu} className="min-h-screen pt-[100px]">
          <Outlet
            context={{
              stories,
              setStories,
              filteredStories,
              setFilteredStories,
              loading,
              setLoading,
            }}
          />
          {firstSegment === "detailstory" ? (
            <div className=" fixed right-4 bottom-3 z-10">
              <ReaderControls />
            </div>
          ) : (
            <></>
          )}
        </main>
        <Footer />
      </div>
    );

    // if (error) {
    //   return <p className="text-red-500">{error}</p>;
    // }

    // return (
    //   <div>
    //     <Navbar />
    //     <main onClick={handleMenu} className="min-h-screen pt-[100px]">
    //       <Outlet context={{
    //         stories,
    //         setStories,
    //         filteredStories,
    //         setFilteredStories ,
    //         loading,
    //         setLoading,
    //       }} />
    //     </main>
    //     <Footer />
    //   </div>
    // );
  };

  return (
    <StoriesContext.Provider value={{
      stories,
      setStories,
      filteredStories,
      setFilteredStories,
      loading,
      setLoading,
    }}>
      <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
        {renderContent()}
      </div>
    </StoriesContext.Provider>
  );
};

export default Layout;

// FIXME: Not passing stories form database to the component

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import Navbar from "../components/Navbar"; // ✅ Import Navbar

// import Footer from "../components/Footer"; // ✅ Corrected Footer import
// import { Outlet } from "react-router-dom";
// import { setMenuState } from "../Store/languageSlice";

// const Layout = () => {
//   const [isImagesLoaded, setIsImagesLoaded] = useState(false);
//   const menuState = useSelector((state) => state.language.menuState);
//   const dispatch = useDispatch();

//   console.log("menuState", menuState);

//   useEffect(() => {
//     const images = document.querySelectorAll("img");
//     const imagePromises = Array.from(images).map((img) => {
//       return new Promise((resolve) => {
//         if (img.complete) resolve();
//         else img.onload = resolve;
//       });
//     });

//     Promise.all(imagePromises).then(() => setIsImagesLoaded(true));
//   }, []);

//   const handleMenu = () => {
//     console.log("menuState", menuState);
//     if (menuState) dispatch(setMenuState(false));
//   };

//   return (
//     <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
//       {!isImagesLoaded ? (
//         <p>Loading content...</p>
//       ) : (
//         <div>
//           <Navbar />
//           <main onClick={handleMenu} className="min-h-screen pt-[100px]">
//             <Outlet /> {/* ✅ This renders the child components */}
//           </main>
//           <Footer />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Layout;
