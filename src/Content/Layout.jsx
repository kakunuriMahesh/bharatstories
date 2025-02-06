// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar"; // ✅ Import Navbar

// import Footer from "../components/Footer"; // ✅ Corrected Footer import

// const Layout = () => {

//   return (
// <div>
//   <Navbar />
//   <main className="min-h-screen pt-[100px]">
//     <Outlet/> {/* ✅ This renders the child components */}
//   </main>
//   <Footer />
// </div>
//   );
// };

// export default Layout;

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // ✅ Import Navbar

import Footer from "../components/Footer"; // ✅ Corrected Footer import
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

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

  return (
    <div>
      {!isImagesLoaded ? (
        <p>Loading content...</p>
      ) : (
        <div>
          <Navbar />
          <main className="min-h-screen pt-[100px] px-[20px] pb-[20px]">
            <Outlet /> {/* ✅ This renders the child components */}
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
