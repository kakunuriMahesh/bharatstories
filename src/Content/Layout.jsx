import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar"; // ✅ Import Navbar

import Footer from "../components/Footer"; // ✅ Corrected Footer import
import { Outlet } from "react-router-dom";
import { setMenuState } from "../Store/languageSlice";

const Layout = () => {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const menuState = useSelector((state) => state.language.menuState);
  const dispatch = useDispatch();

  console.log("menuState", menuState);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    const imagePromises = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) resolve();
        else img.onload = resolve;
      });
    });

    Promise.all(imagePromises).then(() => setIsImagesLoaded(true));
  }, []);

  const handleMenu = () => {
    console.log("menuState", menuState);
    if (menuState) dispatch(setMenuState(false));
  };


  return (
    <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      {!isImagesLoaded ? (
        <p>Loading content...</p>
      ) : (
        <div>
          <Navbar />
          <main onClick={handleMenu} className="min-h-screen pt-[100px]">
            <Outlet /> {/* ✅ This renders the child components */}
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
