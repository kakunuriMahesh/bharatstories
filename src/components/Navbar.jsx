import React, { useEffect, useState, useRef } from "react";
import { Home, Info, Phone, Search } from "lucide-react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eng } from "../Utils/Elglish/EnglishScript";
import Moon from "lucide-react/icons/moon";
import dharmchakra from "../assets/Krishna-2/dharmchakra.jpg";
import Sun from "lucide-react/icons/sun";
import useDarkMode from "../Theme/useDarkMode";
import { setMenuState, setLanguage } from "../Store/languageSlice";

const Navbar = () => {
  // const { stories, filteredStories } = useOutletContext(); // ✅ Use `useOutletContext` to get stories
  // console.log(useOutletContext(), "storiesSearch");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const locationPath = location.pathname;
  // console.log(location.pathname, "location");

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();
  const iconRef = useRef(null);

  // console.log(stories, "storiesSearch");
  const allTitles =
    Eng.stories.length > 0 && Eng.stories.flatMap((each) => each.parts.card);
  const menuState = useSelector((state) => state.language.menuState);
  const language = useSelector((state) => state.language.language);

  const sections = [
    {
      name: "Home",
      icon: (
        <img
          className=" cursor-pointer w-[32px] rounded-[50%]"
          src={dharmchakra}
          alt="dharmchakra"
        />
      ),
      path: "/home",
    },
    { name: "About", icon: <Info size={32} />, path: "/about" },
    { name: "Contact", icon: <Phone size={32} />, path: "/contact" },
  ];

  let startY = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar if scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setShowNavbar(true);
      }
      // Hide navbar if scrolling down past navbar height (100px)
      else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleIconClick = () => {
    // setDropdownOpen(!dropdownOpen);
    dispatch(setMenuState(!menuState));
  };

  const handleSelectIcon = (index) => {
    setActiveIndex(index);
    // setDropdownOpen(false);
    dispatch(setMenuState(false));
    setSuggestions([]);

    // console.log("sections[index].path", sections[index].path);

    navigate(sections[index].path);
  };

  const handleSearchIconClick = () => {
    dispatch(setMenuState(false));
    setIsSearchOpen((prev) => {
      const newState = !prev;
      if (newState) {
        setTimeout(() => searchInputRef.current?.focus(), 0); // Focus after state update
      }
      return newState;
    }); // Toggle search visibility
  };

  const handleDragStart = (e) => {
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleDragMove = (e) => {
    if (!startY.current) return;
    let currentY = e.touches ? e.touches[0].clientY : e.clientY;
    let diffY = startY.current - currentY;

    if (diffY > 30) {
      setActiveIndex((prev) => {
        const newIndex = (prev + 1) % sections.length;
        navigate(sections[newIndex].path);
        return newIndex;
      });
      startY.current = null;
    } else if (diffY < -30) {
      setActiveIndex((prev) => {
        const newIndex = (prev - 1 + sections.length) % sections.length;
        navigate(sections[newIndex].path);
        return newIndex;
      });
      startY.current = null;
    }
  };

  const handleDragEnd = () => {
    startY.current = null;
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(setMenuState(false));

    if (term.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filteredTitles = allTitles.filter((card) =>
      card.title.toLowerCase().includes(term.toLowerCase())
    );

    setSuggestions(filteredTitles);
  };

  const handleSuggestionClick = (title) => {
    navigate(`/search/${encodeURIComponent(title)}`);
    setSearchTerm("");
    setIsSearchOpen(false);
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
      setIsSearchOpen(false);
      setSuggestions([]);
    }
  };

  return (
    <div>
      <nav
        className={`z-30 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-500 fixed md:text-white w-full flex items-center md:justify-between px-[15px] py-[20px] bg-slate-200 dark:bg-slate-800 shadow-lg h-fit`}
      >
        <div className="relative flex items-center gap-2">
          <div className="block md:hidden z-30">
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
              {sections[activeIndex].path === locationPath ? (
                sections[activeIndex].icon
              ) : (
                // <Home size={32} />
                <img
                  className=" cursor-pointer w-[32px] rounded-[50%]"
                  src={dharmchakra}
                  alt="dharmchakra"
                />
              )}
            </div>

            {menuState && (
              <div>
                <div className=" opacity-90 w-full h-full absolute top-0 left-0  "></div>
                <div className="absolute left-[30px] -translate-x-1/2 mt-2 bg-text-dark dark:bg-text-light shadow-md rounded-lg p-2 flex flex-col items-center gap-2">
                  {sections.map((section, index) => (
                    <div
                      key={section.name}
                      className="flex items-center gap-2 p-2 rounded cursor-pointer"
                      onClick={() => handleSelectIcon(index)}
                    >
                      {section.icon}
                    </div>
                  ))}
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="px-4 py-2 rounded dark:text-text-dark text-text-light"
                  >
                    {isDark ? <Moon size={24} /> : <Sun size={24} />}
                  </button>
                  <div
                    className="bg-slate-600 w-[60px] text-center border rounded-md text-white px-[5px] py-[3px] cursor-pointer"
                    onClick={() => {
                      const nextLanguage = language === "en" ? "te" : language === "te" ? "hi" : "en";
                      dispatch(setLanguage(nextLanguage));
                    }}
                  >
                    {language === "en" ? "Tel" : language === "te" ? "हिं" : "Eng"}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            onClick={() => {
              navigate("/home");
            }}
            className="flex items-center gap-2"
          >
            <img
              className=" hidden md:block cursor-pointer w-[30px] rounded-[50%]"
              src={dharmchakra}
              alt="dharmchakra"
            />
            <h1 className=" cursor-pointer w-[fit] md:w-full flex font-bold text-[18px] md:text-[20px] dark:text-text-dark text-text-light">
              Bharat Story Books
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative flex items-center">
            {isSearchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
                className="text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light  pr-[45px] pl-[20px] w-[100%] h-[35px] rounded-[30px]"
              />
            )}
            <div
              onClick={handleSearchIconClick}
              className="absolute right-[12px] dark:text-text-dark text-text-light cursor-pointer"
            >
              <Search size={16} />
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
          <ul className="flex items-center dark:text-text-dark text-text-light md:gap-6  md:text-sm">
            {sections.map((section, index) => (
              <li
                className=" cursor-pointer"
                onClick={() => handleSelectIcon(index)}
                key={section.name}
              >
                {section.name}
              </li>
            ))}
            <button
              onClick={() => setIsDark(!isDark)}
              className="px-4 py-2 rounded dark:text-text-dark text-text-light"
            >
              {isDark ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <div
              className="bg-slate-600 md:w-[70px] text-center border rounded-md text-white px-[9px] py-[5px] text-[15px] cursor-pointer"
              onClick={() => {
                const nextLanguage = language === "en" ? "te" : language === "te" ? "hi" : "en";
                dispatch(setLanguage(nextLanguage));
              }}
            >
              {language === "en" ? "తెలుగు" : language === "te" ? "हिंदी" : "English"}
            </div>
          </ul>
        </div>
        <div className="md:hidden flex items-center absolute right-2 left-2">
          {isSearchOpen && (
            <input
              ref={searchInputRef}
              placeholder="Bharat Story Books"
              className=" text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light px-[60px] w-[100%] h-[60px] rounded-[30px]"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
            />
          )}

          <div
            onClick={handleSearchIconClick}
            className="absolute cursor-pointer right-[12px] dark:text-text-dark text-text-light"
          >
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
