import React, { useEffect, useState, useRef } from "react";
import { Home, Info, Phone, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Eng } from "../Utils/Elglish/EnglishScript";
import Moon from "lucide-react/icons/moon";
import Sun from "lucide-react/icons/sun";
import useDarkMode from "../Theme/useDarkMode";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const allTitles = Eng.stories.flatMap((each) => each.parts.card);

  const sections = [
    { name: "Home", icon: <Home size={32} />, path: "/home" },
    { name: "About", icon: <Info size={32} />, path: "/about" },
    { name: "Contact", icon: <Phone size={32} />, path: "/contact" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isDark, setIsDark] = useDarkMode();

  const iconRef = useRef(null);
  let startY = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleIconClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectIcon = (index) => {
    setActiveIndex(index);
    setDropdownOpen(false);
    console.log("sections[index].path", sections[index].path);

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
      startY.current = null;
    } else if (diffY < -30 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      navigate(sections[activeIndex - 1].path);
      startY.current = null;
    }
  };

  const handleDragEnd = () => {
    startY.current = null;
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Filter suggestions based on title
    const filteredTitles = allTitles.filter((card) =>
      card.title.toLowerCase().includes(term.toLowerCase())
    );

    setSuggestions(filteredTitles);
  };

  const handleSuggestionClick = (title) => {
    navigate(`/search/${encodeURIComponent(title)}`); // Navigate using title
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      const matchedTitle = allTitles.find(
        (card) => card.title.toLowerCase() === searchTerm.toLowerCase()
      );

      if (matchedTitle) {
        navigate(`/search/${encodeURIComponent(matchedTitle.title)}`);
      } else {
        console.log(matchedTitle, "check notfound");
        navigate(`/not-found/${searchTerm}`);
      }
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  return (
    <div>
      <nav
        className={`z-30 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 fixed md:text-white w-full flex items-center md:justify-between p-6 bg-slate-200 dark:bg-slate-800 shadow-lg h-[100px]`}
      >
        <h1
          onClick={() => {
            navigate("/home");
          }}
          className=" cursor-pointer hidden md:flex font-bold text-[18px] md:text-[30px] dark:text-text-dark text-text-light"
        >
          Bharat Stories
        </h1>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              className="text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light  pr-[45px] pl-[20px] w-[100%] h-[60px] rounded-[30px]"
            />
            <div className="absolute right-[12px] dark:text-text-dark text-text-light">
              <Search />
            </div>
            {suggestions.length > 0 && (
              <ul className="absolute top-12 left-0 w-full bg-white text-black shadow-md rounded-lg">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(item.title)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className="flex dark:text-text-dark text-text-light md:gap-6 md:text-2xl">
            {sections.map((section, index) => (
              <li
                className=" cursor-pointer"
                onClick={() => handleSelectIcon(index)}
                key={section.name}
              >
                {/* <a href="#">{section.name}</a> */}
                {section.name}
              </li>
            ))}
            <button
              onClick={() => setIsDark(!isDark)}
              className="px-4 py-2 rounded dark:text-text-dark text-text-light"
            >
              {isDark ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </ul>
        </div>
        <div className="md:hidden flex w-full items-center relative">
          <input
            placeholder="Bharat Stories"
            className="text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light px-[60px] w-[100%] h-[60px] rounded-[30px]"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
          />
          <div className="block md:hidden absolute left-[12px]">
            <div
              ref={iconRef}
              className="w-[40px] h-[40px] p-1 border-2 shadow-2xl bg-text-dark dark:bg-text-light rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300"
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
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-text-dark dark:bg-text-light shadow-md rounded-lg p-2 flex flex-col gap-2">
                {sections.map(
                  (section, index) =>
                    index !== activeIndex && (
                      <div
                        key={section.name}
                        className="flex items-center gap-2 p-2 rounded cursor-pointer"
                        onClick={() => handleSelectIcon(index)}
                      >
                        {section.icon}
                      </div>
                    )
                )}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="px-4 py-2 rounded dark:text-text-dark text-text-light"
                >
                  {isDark ? <Moon size={24} /> : <Sun size={24} />}
                </button>
              </div>
            )}
          </div>
          <div className="absolute right-[12px] dark:text-text-dark text-text-light">
            <Search />
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-white text-black shadow-md rounded-lg">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
