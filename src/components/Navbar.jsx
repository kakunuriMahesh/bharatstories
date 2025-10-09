import React, { useEffect, useState, useRef } from "react";
import { Home, Info, Phone, Search } from "lucide-react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStoriesContext } from "../Content/Layout";
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

  const menuState = useSelector((state) => state.language.menuState);
  const language = useSelector((state) => state.language.language);
  const changedProfile = useSelector((state) => state.profile.selected);
  const [profile, setProfile] = useState(null);
  
  // Get stories from context
  const { stories, filteredStories } = useStoriesContext();

  // Live translation using Google Translate API
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = async (text, targetLang) => {
    if (!text.trim() || targetLang === 'en') {
      setTranslatedText('');
      return '';
    }

    setIsTranslating(true);
    try {
      // Using Google Translate API (you'll need to get an API key)
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData) {
        const translated = data.responseData.translatedText;
        setTranslatedText(translated);
        return translated;
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
    
    setTranslatedText('');
    return '';
  };

  // Get language code for translation API
  const getLanguageCode = () => {
    switch (language) {
      case 'te': return 'te'; // Telugu
      case 'hi': return 'hi'; // Hindi
      default: return 'en';
    }
  };

  // Function to get searchable cards based on profile - SAME LOGIC AS KIDS.JSX
  const getSearchableCards = () => {
    if (!stories || stories.length === 0 || !profile) {
      return [];
    }

    let allCards = [];
    if (profile.id === 'kids') {
      const kidsStories = stories.filter((s) => s.kids?.card?.length > 0);
      allCards = kidsStories.map((story) => story.kids.card).flat();
    } else if (profile.id === 'toddler') {
      const toddlerStories = stories.filter((s) => s.toddler?.card?.length > 0);
      allCards = toddlerStories.map((story) => story.toddler.card).flat();
    } else {
      // Adult profile
      allCards = stories.flatMap((s) => s.parts?.card || []);
    }

    // CRITICAL: Filter cards that have content in the selected language
    // This ensures we only show cards that actually have content in the user's language
    return allCards.filter((card) => {
      return card.title?.[language] && 
             card.description?.[language] && 
             card.storyType?.[language] && 
             card.timeToRead?.[language];
    });
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem("selectedProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      navigate("/");
    }
  }, [changedProfile]);

  // Debug useEffect to see when stories are available
  useEffect(() => {
    console.log("Stories updated:", stories.length);
    console.log("Profile:", profile?.id);
    if (stories.length > 0 && profile) {
      const cards = getSearchableCards();
      console.log("Available cards for search:", cards.length);
    }
  }, [stories, profile]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.select();
        }
      });
    }
  }, [isSearchOpen]);

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
      path: profile
        ? profile.id === "toddler"
          ? "/toddler"
          : profile.id === "kids"
          ? "/kids"
          : "/home"
        : "/",
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
        // Focus the input field when opening search
        setTimeout(() => {
          if (searchInputRef.current) {
            searchInputRef.current.focus();
            searchInputRef.current.select(); // Select any existing text
          }
        }, 100); // Increased delay for desktop
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

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(setMenuState(false));

    if (term.trim() === "") {
      setSuggestions([]);
      setTranslatedText('');
      return;
    }

    // Get real cards based on profile
    const allCards = getSearchableCards();
    
    // Live translate the search term
    const targetLang = getLanguageCode();
    const translatedTerm = await translateText(term, targetLang);
    
    // Filter based on search term with live translation support
    const filteredCards = allCards.filter((card) => {
      const searchTermLower = term.toLowerCase();
      
      // First priority: Search in the selected language
      const titleInSelectedLanguage = card.title?.[language]?.toLowerCase() || '';
      if (titleInSelectedLanguage.includes(searchTermLower)) {
        return true;
      }
      
      // Second priority: Search using live translated term
      if (translatedTerm && titleInSelectedLanguage.includes(translatedTerm.toLowerCase())) {
        return true;
      }
      
      // Third priority: Search in other languages
      const titleEn = card.title?.en?.toLowerCase() || '';
      const titleTe = card.title?.te?.toLowerCase() || '';
      const titleHi = card.title?.hi?.toLowerCase() || '';
      
      return titleEn.includes(searchTermLower) ||
             titleTe.includes(searchTermLower) ||
             titleHi.includes(searchTermLower);
    });

    // Store the live translation separately, not in each suggestion
    setSuggestions(filteredCards);
  };

  const handleSuggestionClick = (card) => {
    // Navigate based on profile type
    if (profile?.id === 'kids') {
      navigate(`/kids/${encodeURIComponent(card.title[language] || card.title.en)}`);
    } else if (profile?.id === 'toddler') {
      navigate(`/toddler/${encodeURIComponent(card.title[language] || card.title.en)}`);
    } else {
      navigate(`/search/${encodeURIComponent(card.title[language] || card.title.en)}`);
    }
    setSearchTerm("");
    setIsSearchOpen(false);
    setSuggestions([]);
  };

  const handleSearchSubmit = async (e) => {
    if (e.key === "Enter") {
      // Get real cards and find exact match
      const allCards = getSearchableCards();
      
      // Get live translation for the search term
      const targetLang = getLanguageCode();
      const translatedTerm = await translateText(searchTerm, targetLang);
      
      const matchedCard = allCards.find(
        (card) => {
          const searchTermLower = searchTerm.toLowerCase();
          
          // First priority: Exact match in selected language
          if (card.title?.[language]?.toLowerCase() === searchTermLower) {
            return true;
          }
          
          // Second priority: Match with live translated term
          if (translatedTerm && card.title?.[language]?.toLowerCase() === translatedTerm.toLowerCase()) {
            return true;
          }
          
          // Third priority: Exact match in other languages
          return (card.title?.en?.toLowerCase() === searchTermLower) ||
                 (card.title?.te?.toLowerCase() === searchTermLower) ||
                 (card.title?.hi?.toLowerCase() === searchTermLower);
        }
      );

      if (matchedCard) {
        // Navigate based on profile type
        if (profile?.id === 'kids') {
          navigate(`/kids/${encodeURIComponent(matchedCard.title[language] || matchedCard.title.en)}`);
        } else if (profile?.id === 'toddler') {
          navigate(`/toddler/${encodeURIComponent(matchedCard.title[language] || matchedCard.title.en)}`);
        } else {
          navigate(`/search/${encodeURIComponent(matchedCard.title[language] || matchedCard.title.en)}`);
        }
      } else {
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
                      const nextLanguage =
                        language === "en"
                          ? "te"
                          : language === "te"
                          ? "hi"
                          : "en";
                      dispatch(setLanguage(nextLanguage));
                    }}
                  >
                    {language === "en"
                      ? "Tel"
                      : language === "te"
                      ? "हिं"
                      : "Eng"}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            onClick={() => {
              // navigate("/home");
              profile
                ? profile.id === "toddler"
                  ? navigate("/toddler")
                  : profile.id === "kids"
                  ? navigate("/kids")
                  : navigate("/home")
                : navigate("/");
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
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              className={`text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light pr-[45px] pl-[20px] w-[300px] h-[35px] rounded-[30px] transition-all duration-200 ${
                isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible w-0'
              }`}
            />
            <div
              onClick={handleSearchIconClick}
              className={`absolute right-[12px] top-1/2 transform -translate-y-1/2 dark:text-text-dark text-text-light cursor-pointer ${isSearchOpen ? 'right-[12px]' : ''}`}
            >
              <Search size={16} />
            </div>
            {searchTerm && (
              <div className="absolute top-full left-0 w-[300px] bg-white text-black shadow-lg rounded-lg border border-gray-200 z-50 mt-1">
                {translatedText && (
                  <div className="p-2 bg-blue-50 border-b border-blue-200 rounded-t-lg">
                    <div className="text-sm text-gray-600 font-medium">
                      Live Translation: "{translatedText}"
                    </div>
                  </div>
                )}
                {isTranslating && (
                  <div className="p-2 bg-gray-50 border-b border-gray-200">
                    <div className="text-sm text-gray-500">
                      Translating...
                    </div>
                  </div>
                )}
                {suggestions.length > 0 ? (
                  <ul className="max-h-[300px] overflow-y-auto">
                    {suggestions.map((item, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {item.title?.[language] || item.title?.en || "Untitled"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-2 text-gray-500">
                    No results found for "{searchTerm}"
                  </div>
                )}
              </div>
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
                const nextLanguage =
                  language === "en" ? "te" : language === "te" ? "hi" : "en";
                dispatch(setLanguage(nextLanguage));
              }}
            >
              {language === "en"
                ? "తెలుగు"
                : language === "te"
                ? "हिंदी"
                : "English"}
            </div>
          </ul>
          <div
            // key={profile.id}
            className={`flex flex-col items-center justify-center cursor-pointer`}
            onClick={() => navigate("/profile")}
          >
            <div className=" rounded-full overflow-hidden border-4 border-transparent hover:border-blue-500 transition flex justify-center items-center">
              {/* <img
                src="https://img.icons8.com/color/96/user-male-circle.png"
                alt="profile"
                className="w-[60px] h-[60px] object-cover"
              /> */}
              {profile && (
                <img
                  src={profile.avatar}
                  alt={profile.label}
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden flex items-center absolute right-2 left-2">
          <div className="relative w-full">
            {isSearchOpen && (
              <input
                ref={searchInputRef}
                placeholder="Bharat Story Books"
                className="text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light px-[60px] w-full h-[60px] rounded-[30px]"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
              />
            )}

            <div
              onClick={handleSearchIconClick}
              className="absolute cursor-pointer right-[12px] top-1/2 transform -translate-y-1/2 dark:text-text-dark text-text-light"
            >
              <Search />
            </div>
            {searchTerm && (
              <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg rounded-lg border border-gray-200 z-50 mt-1">
                {translatedText && (
                  <div className="p-2 bg-blue-50 border-b border-blue-200 rounded-t-lg">
                    <div className="text-sm text-gray-600 font-medium">
                      Live Translation: "{translatedText}"
                    </div>
                  </div>
                )}
                {isTranslating && (
                  <div className="p-2 bg-gray-50 border-b border-gray-200">
                    <div className="text-sm text-gray-500">
                      Translating...
                    </div>
                  </div>
                )}
                {suggestions.length > 0 ? (
                  <ul className="max-h-[250px] overflow-y-auto">
                    {suggestions.map((item, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {item.title?.[language] || item.title?.en || "Untitled"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-2 text-gray-500">
                    No results found for "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            // key={profile.id}
            className={`flex flex-col items-center justify-center cursor-pointer`}
            onClick={() => navigate("/profile")}
          >
            <div className=" rounded-full overflow-hidden border-4 border-transparent hover:border-blue-500 transition flex justify-center items-center">
              {/* <img
                src="https://img.icons8.com/color/96/user-male-circle.png"
                alt="profile"
                className="w-[60px] h-[60px] object-cover"
              /> */}
              {profile && (
                <img
                  src={profile.avatar}
                  alt={profile.label}
                  className="w-8 h-8 rounded-full border-2 border-blue-500"
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
