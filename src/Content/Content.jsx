// import React, { useEffect, useState } from "react";
// import { Home, Info, Phone } from "lucide-react";
// import { Eng } from "../Utils/Elglish/EnglishScript";
// import StoriesList from "./StoriesList";

// const Content = () => {
//   console.log(Eng, "English");
//   const handleViewAll = (storyType) => {
//     console.log("View All", storyType);
//   };
//   const sections = [
//     { name: "Home", icon: <Home size={32} />, path: "/" },
//     { name: "About", icon: <Info size={32} />, path: "/" },
//     { name: "Contact", icon: <Phone size={32} />, path: "/" },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     let lastY = window.scrollY;
//     console.log(lastY);

//     const handleScroll = () => {
//       const currentY = window.scrollY;

//       if (currentY < lastY && activeIndex < sections.length - 1) {
//         setActiveIndex((prev) => prev + 1);
//       } else if (currentY > lastY && activeIndex > 0) {
//         setActiveIndex((prev) => prev - 1);
//       }

//       lastY = currentY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [activeIndex]);

//   return (
//     <div className="">
//       <nav className="flex justify-between p-6 bg-slate-400 shadow-lg">
//         <div>
//           <h1 className="font-bold text-[30px]">Bharat Stories</h1>
//         </div>
//         <div>
//           {/* <ul className="flex gap-6 text-2xl md:block hidden"> */}
//           <ul className="hidden md:flex md:gap-6 md:text-2xl">
//             <li>
//               <a href="#">Home</a>
//             </li>
//             <li>
//               <a href="#">About</a>
//             </li>
//             <li>
//               <a href="#">Contact</a>
//             </li>
//           </ul>

//           <div className="w-[40px] h-[40px] p-1 bg-white rounded-full flex items-center justify-center transition-transform duration-300">
//             {sections[activeIndex].icon}
//           </div>
//           <div>{/* language Dropdown */}</div>
//         </div>
//       </nav>
//       <div className="p-[30px]">
//         <h1>English</h1>
//         {Eng?.stories.map((eachStory, storyIndex) => (
//           <div key={eachStory?.id}>
//             <div className="flex justify-between">
//               <h2 className="text-[20px] font-bold">{eachStory?.name}</h2>
//               <button
//                 className=" underline cursor-pointer"
//                 onClick={() => handleViewAll(eachStory?.name)}
//               >
//                 View All
//               </button>
//             </div>
//             <div className=" mt-[20px] grid grid-flow-col md:grid-cols-4 md:gap-[10px] lg:grid-cols-6 lg:gap-[15px] sm:grid-cols-3 grid-cols-2  gap-[5px]">
//               {eachStory?.parts?.card.map((eachPart, partIndex) => (
//                 <div className="" key={eachPart.id}>
//                   <StoriesList
//                     key={eachPart.id}
//                     eachPart={eachPart}
//                     eachStory={eachStory.name}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Content;

// second =========

// import React, { useEffect, useState } from "react";
// import { Home, Info, Phone } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Eng } from "../Utils/Elglish/EnglishScript";
// import StoriesList from "./StoriesList";

// const Content = () => {
//   console.log(Eng, "English");
//   const navigate = useNavigate();

//   const sections = [
//     { name: "Home", icon: <Home size={32} />, path: "/" },
//     { name: "About", icon: <Info size={32} />, path: "/" },
//     { name: "Contact", icon: <Phone size={32} />, path: "/" },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     let lastY = window.scrollY;

//     const handleScroll = () => {
//       const currentY = window.scrollY;

//       if (currentY < lastY && activeIndex < sections.length - 1) {
//         setActiveIndex((prev) => prev + 1);
//       } else if (currentY > lastY && activeIndex > 0) {
//         setActiveIndex((prev) => prev - 1);
//       }

//       lastY = currentY;
//       navigate(sections[activeIndex].path); // Update URL on scroll
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [activeIndex, navigate]);

//   const handleIconClick = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleSelectIcon = (index) => {
//     setActiveIndex(index);
//     setDropdownOpen(false);
//     navigate(sections[index].path); // Update path on selection
//   };

//   return (
//     <div>
//       <nav className="sticky top-0 flex items-center md:justify-between p-6 bg-slate-400 shadow-lg">
//         <h1 className="hidden md:flex font-bold text-[18px] md:text-[30px]">
//           Bharat Stories
//         </h1>
//         <ul className="hidden md:flex md:gap-6 md:text-2xl">
//           <li>
//             <a href="#">Home</a>
//           </li>
//           <li>
//             <a href="#">About</a>
//           </li>
//           <li>
//             <a href="#">Contact</a>
//           </li>
//         </ul>
//         <div className="flex w-full items-center relative">
//           <input placeholder="Bharat Stories" className=" text-center w-[100%] h-[60px] rounded-[30px]" />
//           <div className=" block md:hidden absolute right-[12px]">
//             <div
//               className="w-[40px] h-[40px] p-1 border-2 shadow-2xl bg-white rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300"
//               onClick={handleIconClick}
//             >
//               {sections[activeIndex].icon}
//             </div>

//             {dropdownOpen && (
//               <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white shadow-md rounded-lg p-2 flex flex-col gap-2">
//                 {sections.map(
//                   (section, index) =>
//                     index !== activeIndex && (
//                       <div
//                         key={section.name}
//                         className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
//                         onClick={() => handleSelectIcon(index)}
//                       >
//                         {section.icon}
//                         <span>{section.name}</span>
//                       </div>
//                     )
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       <div className="p-[30px]">
//         <h1>English</h1>
//         {Eng?.stories.map((eachStory) => (
//           <div key={eachStory?.id}>
//             <div className="flex justify-between">
//               <h2 className="text-[20px] font-bold">{eachStory?.name}</h2>
//               <button className="underline cursor-pointer">View All</button>
//             </div>
//             <div className="mt-[20px] grid grid-flow-col md:grid-cols-4 md:gap-[10px] lg:grid-cols-6 lg:gap-[15px] sm:grid-cols-3 grid-cols-2 gap-[5px]">
//               {eachStory?.parts?.card.map((eachPart) => (
//                 <StoriesList
//                   key={eachPart.id}
//                   eachPart={eachPart}
//                   eachStory={eachStory.name}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Content;

// Third =======

import React, { useEffect, useState, useRef } from "react";
import { Home, Info, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Eng } from "../Utils/Elglish/EnglishScript";
import StoriesList from "./StoriesList";

const Content = () => {
  console.log(Eng, "English");
  const navigate = useNavigate();

  const sections = [
    { name: "Home", icon: <Home size={32} />, path: "/" },
    { name: "About", icon: <Info size={32} />, path: "/" },
    { name: "Contact", icon: <Phone size={32} />, path: "/" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const iconRef = useRef(null);
  let startY = useRef(null);

  const handleIconClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectIcon = (index) => {
    setActiveIndex(index);
    setDropdownOpen(false);
    navigate(sections[index].path);
  };

  const handleDragStart = (e) => {
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleDragMove = (e) => {
    if (!startY.current) return;

    let currentY = e.touches ? e.touches[0].clientY : e.clientY;
    let diffY = startY.current - currentY;

    if (diffY > 30 && activeIndex < sections.length - 1) {
      setActiveIndex((prev) => prev + 1);
      navigate(sections[activeIndex + 1].path);
      startY.current = null; // Reset to prevent continuous firing
    } else if (diffY < -30 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      navigate(sections[activeIndex - 1].path);
      startY.current = null;
    }
  };

  const handleDragEnd = () => {
    startY.current = null;
  };

  const handleViewAll = (storyName) =>{
    console.log(storyName, ":viewAll")
    navigate(`/:${storyName}`)
  }

  return (
    <div>
      <nav className="sticky top-0 flex items-center md:justify-between p-6 bg-slate-400 shadow-lg h-[100px]">
        <h1 className="hidden md:flex font-bold text-[18px] md:text-[30px]">
          Bharat Stories
        </h1>
        <ul className="hidden md:flex md:gap-6 md:text-2xl">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <div className="md:hidden flex w-full items-center relative">
          <input
            placeholder="Bharat Stories"
            className="text-center w-[100%] h-[60px] rounded-[30px]"
          />
          <div className="block md:hidden absolute right-[12px]">
            <div
              ref={iconRef}
              className="w-[40px] h-[40px] p-1 border-2 shadow-2xl bg-white rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300"
              onClick={handleIconClick}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {sections[activeIndex].icon}
            </div>

            {dropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white shadow-md rounded-lg p-2 flex flex-col gap-2">
                {sections.map(
                  (section, index) =>
                    index !== activeIndex && (
                      <div
                        key={section.name}
                        className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
                        onClick={() => handleSelectIcon(index)}
                      >
                        {section.icon}
                        {/* <span>{section.name}</span> */}
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="p-[30px]">
        <h1>English</h1>
        {Eng?.stories.map((eachStory) => (
          <div key={eachStory?.id}>
            <div className="flex justify-between">
              <h2 className="text-[20px] font-bold">{eachStory?.name}</h2>
              <button onClick={()=>handleViewAll(eachStory?.name)} className="underline cursor-pointer">View All</button>
            </div>
            <div className="mt-[20px] overflow-x-scroll flex gap-2 scrollbar-hide">
              {eachStory?.parts?.card.map((eachPart) => (
                <StoriesList
                  key={eachPart.id}
                  eachPart={eachPart}
                  eachStory={eachStory.name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
