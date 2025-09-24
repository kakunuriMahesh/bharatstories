import React, { useState, useEffect, useRef } from "react";
import { PageFlip } from "page-flip";

const storyContent = [
  {
    image: "https://res.cloudinary.com/dwhmqaqhj/image/upload/v1745407365/Chiaroscuro_lighting_depicts_Vasudev_dark_skin_carrying_a_basket_with_baby_Krishna_walking_through_a_stormy_night._Strong_contrasts_and_deep_shadows._Lightning_illuminates_the_flooded_forest_path._Baby_Krishna_ixttrv.jpg",
    text: "This is the first scene of the story.",
  },
  {
    image: "https://res.cloudinary.com/dwhmqaqhj/image/upload/v1745407364/Krishna-Janmashtami-Crossing-the-river_pxvkno.jpg",
    text: "The adventure continues in the forest.",
  },
  {
    image: "https://res.cloudinary.com/dwhmqaqhj/image/upload/v1745407366/piclumen-1744633858990_eyc5p4.png",
    text: "The hero reaches the castle.",
  },
];

const StoryViewer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoReader, setAutoReader] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [orientation, setOrientation] = useState("landscape");
  const [state, setState] = useState("read");
  const bookRef = useRef(null);
  const pageFlipRef = useRef(null);

  // Initialize PageFlip
  useEffect(() => {
    const initializePageFlip = () => {
      if (!bookRef.current) return;

      pageFlipRef.current = new PageFlip(bookRef.current, {
        width: 550,
        height: 733,
        size: "stretch",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
        disableFlipByClick: false,
        drawShadow: true,
      });

      const pages = bookRef.current.querySelectorAll(".page");
      if (pages.length > 0) {
        pageFlipRef.current.loadFromHTML(pages);
        setPageCount(pageFlipRef.current.getPageCount());
        setOrientation(pageFlipRef.current.getOrientation());
      } else {
        console.warn("No .page elements found");
      }

      pageFlipRef.current.on("flip", (e) => {
        setCurrentPage(e.data);
        stopSpeech();
        if (autoReader) setAutoReader(false);
      });

      pageFlipRef.current.on("changeState", (e) => {
        setState(e.data);
      });

      pageFlipRef.current.on("changeOrientation", (e) => {
        setOrientation(e.data);
      });
    };

    const timer = setTimeout(initializePageFlip, 0);

    return () => {
      clearTimeout(timer);
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
      }
    };
  }, []);

  // Text-to-speech
  const readText = (text) => {
    return new Promise((resolve) => {
      if (isSpeaking) window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      window.speechSynthesis.speak(utterance);
    });
  };

  // Stop speech
  const stopSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Read current page
  const readCurrentPage = () => {
    if (!isSpeaking && currentPage > 0 && currentPage <= storyContent.length) {
      readText(storyContent[currentPage - 1].text);
    }
  };

  // Auto Reader mode
  useEffect(() => {
    let isMounted = true;
    const startAutoReader = async () => {
      // Start from the current page or page 1 if on cover
      let i = currentPage === 0 ? 1 : currentPage;
      while (i <= storyContent.length && isMounted && autoReader) {
        setCurrentPage(i);
        // Wait 1 second before reading to view the page
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!autoReader || !isMounted) break;
        await readText(storyContent[i - 1].text);
        if (!autoReader || i === storyContent.length) break;
        // Wait 1 second after reading before flipping
        await new Promise((resolve) => setTimeout(resolve, 1000));
        pageFlipRef.current?.flipNext();
        i++;
      }
      if (isMounted) {
        setIsSpeaking(false);
        setAutoReader(false); // Stop Auto Reader at the end
      }
    };

    if (autoReader) startAutoReader();
    else stopSpeech();

    return () => {
      isMounted = false;
      stopSpeech();
    };
  }, [autoReader]);

  // Show controls on story pages (1 to storyContent.length)
  const showControls = currentPage > 0 && currentPage <= storyContent.length;

  return (
    <div>
      <h1 className="mt-6 text-2xl font-bold">New Content:</h1>
    <div className="story-container">
      <div className="flip-book" id="demoBookExample" ref={bookRef}>
        <div className="page page-cover page-cover-top" data-density="hard">
          <div className="page-content">
            <h2>Birth<br/> of <br/> Shree Krishna</h2>
          </div>
        </div>
        {storyContent.map((page, index) => (
          <div className="page" key={index} data-density="soft">
            <div className="page-content">
              <h2 className="page-header">Page {index + 1}</h2>
              <div
                className="page-image"
                style={{ backgroundImage: `url(${page.image})` }}
              ></div>
              <div className="page-text">{page.text}</div>
              <div className="page-footer">{index + 2}</div>
            </div>
          </div>
        ))}
        <div className="page page-cover page-cover-bottom" data-density="hard">
          <div className="page-content">
            <h2>To be continued...</h2>
          </div>
        </div>
      </div>
      {showControls && (
        <div className="controls">
          <button
            className="read-btn"
            onClick={readCurrentPage}
            disabled={isSpeaking}
          >
            Read
          </button>
          <label>
            <input
              type="checkbox"
              checked={autoReader}
              onChange={() => setAutoReader(!autoReader)}
            />
            Auto Reader Mode
          </label>
        </div>
      )}
    </div>
    </div>
  );
};

export default StoryViewer;
