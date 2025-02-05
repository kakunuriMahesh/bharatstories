import React, { useEffect, useState, useRef } from "react";
import { Home, Info, Phone, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Eng } from "../Utils/Elglish/EnglishScript";

const Navbar = () => {
  console.log(Eng, "English");
  const navigate = useNavigate();

  const sections = [
    { name: "Home", icon: <Home size={32} />, path: "/" },
    { name: "About", icon: <Info size={32} />, path: "/" },
    { name: "Contact", icon: <Phone size={32} />, path: "/" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState("");
  const iconRef = useRef(null);
  let startY = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
    //   setScrollY(window.scrollY);
      console.log(window.scrollY, "scrollY");
    };

    window.addEventListener("scroll", handleScroll); // Listen for scroll events

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup listener
    };
  }, []);

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

  return (
    <div>
        {/* //FIXME: fix the navbar on scroll  */}
      <nav className={`${scrollY<200?"":"sticky"} md:text-white w-full flex items-center md:justify-between p-6 bg-[#b00000] shadow-lg h-[100px]`}>
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
            className="text-left px-[60px] w-[100%] h-[60px] rounded-[30px]"
          />
          <div className="block md:hidden absolute left-[12px]">
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
          <div className="absolute right-[12px]">
            <Search />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
