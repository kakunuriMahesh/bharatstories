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


import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { setMenuState } from "../Store/languageSlice";
import { HomeBannerShimmer, StoryShimmer } from "../components/Loading/storyShimmer";

const Layout = () => {
  // Existing states
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const menuState = useSelector((state) => state.language.menuState);
  const dispatch = useDispatch();

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
        const response = await axios.get('https://bharat-story-backend.vercel.app/api/stories');
        setStories(response.data);
        setFilteredStories(response.data);
      } catch (err) {
        setError('Failed to fetch stories');
        console.error('Failed to fetch stories:', err);
      } finally {
        setLoading(false);
      }
    };

    // Execute both
    Promise.all([...imagePromises]).then(() => setIsImagesLoaded(true));
    fetchStories();
  }, []);
  console.log(stories, "database")


  const handleMenu = () => {
    console.log("menuState", menuState);
    if (menuState) dispatch(setMenuState(false));
  };

  // Pass stories to child components through Outlet
  const renderContent = () => {
    if (stories.length > 0) {
      return (
        <div>
          <Navbar />
          <main onClick={handleMenu} className="min-h-screen pt-[100px]">
            <Outlet context={{ 
              stories, 
              setStories, 
              filteredStories, 
              setFilteredStories ,
              loading,
              setLoading,
            }} />
          </main>
          <Footer />
        </div>
      );
    }

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
    <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      {renderContent()}
    </div>
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
