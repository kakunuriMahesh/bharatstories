import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";

const YourComponent = ({ story, language }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isDesktop = windowWidth > 770;
  const { fontSize, theme } = useSelector((state) => state.readerSettings);

  const imageRefs = useRef([]);
  const paraRefs = useRef([]);
  const [splitTexts, setSplitTexts] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState({});

  // TTS state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const shouldStop = useRef(false);
  const [voices, setVoices] = useState([]);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    const timeout = setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      setVoicesLoaded(true);
      console.log("Available voices:", availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Handle language change
  useEffect(() => {
    if (isSpeaking) {
      stopSpeech();
      readText();
    }
  }, [language]);

  // Stop TTS on back navigation
  useEffect(() => {
    const handlePopstate = () => {
      console.log("Navigation detected, stopping TTS");
      stopSpeech();
    };

    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isSpeaking]);

  // Stop TTS and reset button on story change
  useEffect(() => {
    console.log("Story changed, stopping TTS");
    stopSpeech();
  }, [story]);

  // Split text based on image height
  useLayoutEffect(() => {
    const calculateSplitTexts = () => {
      const newSplitTexts = (story?.part || []).map((section, i) => {
        const imageEl = imageRefs.current[i];
        const paraEl = paraRefs.current[i];

        if (!isDesktop || !imageEl || !paraEl || !imagesLoaded[i]) {
          return {
            first: section.text?.[language] || "",
            second: "",
          };
        }

        const imageHeight = imageEl.getBoundingClientRect().height + 23;
        const paraText = section.text?.[language] || "";
        const words = paraText.split(" ");

        const tempEl = document.createElement("p");
        tempEl.style.fontSize = `${fontSize}px`;
        tempEl.style.visibility = "hidden";
        tempEl.style.position = "absolute";
        tempEl.style.width = `${paraEl.getBoundingClientRect().width}px`;
        tempEl.style.lineHeight = getComputedStyle(paraEl).lineHeight;
        document.body.appendChild(tempEl);

        let currentText = "";
        let overflowText = "";

        for (let j = 0; j < words.length; j++) {
          const testText = currentText + words[j] + " ";
          tempEl.textContent = testText;

          if (tempEl.getBoundingClientRect().height > imageHeight) {
            overflowText = words.slice(j).join(" ");
            break;
          }
          currentText = testText;
        }

        document.body.removeChild(tempEl);

        return {
          first: currentText.trim(),
          second: overflowText.trim(),
        };
      });

      setSplitTexts(newSplitTexts);
    };

    calculateSplitTexts();
  }, [isDesktop, story, language, imagesLoaded, fontSize, theme]);

  // Simplified text-to-speech
  const readText = async () => {
    if (isSpeaking) {
      console.log("TTS already in progress");
      return;
    }
    if (!story?.part?.length) {
      console.warn("No story parts available for TTS");
      return;
    }
    if (!voicesLoaded) {
      console.warn("Voices not loaded yet, cannot start TTS");
      return;
    }

    console.log("First part text:", story.part[0].text?.[language]);
    setIsSpeaking(true);
    shouldStop.current = false;

    for (let i = 0; i < story.part.length; i++) {
      if (shouldStop.current) {
        console.log("TTS stopped by user");
        break;
      }

      const text = story.part[i].text?.[language];
      if (!text || typeof text !== "string") {
        console.warn(`Skipping part ${i}: No valid text for language '${language}'`);
        continue;
      }

      console.log(`Reading part ${i}: ${text}`);
      await new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-US";

        // Set voice if available
        const voice = voices.find(
          (v) => v.lang === (language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-US")
        );
        if (voice) {
          utterance.voice = voice;
          console.log(`Using voice: ${voice.name}`);
        } else {
          console.warn(`No voice found for ${language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-US"}`);
        }

        utterance.onstart = () => console.log(`TTS started for part ${i}`);
        utterance.onend = () => {
          console.log(`TTS ended for part ${i}`);
          resolve();
        };
        utterance.onerror = (e) => {
          console.error(`TTS error for part ${i}:`, e);
          resolve();
        };
        window.speechSynthesis.speak(utterance);
      });
    }

    setIsSpeaking(false);
    shouldStop.current = false;
  };

  // Stop speech
  const stopSpeech = () => {
    if (isSpeaking) {
      console.log("Stopping TTS");
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      shouldStop.current = true;
    }
  };

  // Toggle read/stop
  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      readText();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Debug story data
  useEffect(() => {
    console.log("Story data:", story);
    console.log("Language:", language);
  }, [story, language]);

  return (
    <>
      {(story?.part || []).map((section, index) => (
        <div key={section.id} className="mt-6">
          <p
            style={{ fontSize: `${fontSize + 2}px` }}
            className="font-bold mb-[5px]"
          >
            {`${index + 1})`} {section.heading?.[language] || "No heading"}:{" "}
            <span className="italic font-normal">
              {section.quote?.[language] || "No quote"}
            </span>
          </p>
          <div
            className={`pt-2 flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-start gap-6`}
          >
            <div className="md:w-1/2 w-full">
              <img
                ref={(el) => (imageRefs.current[index] = el)}
                onLoad={() =>
                  setImagesLoaded((prev) => ({ ...prev, [index]: true }))
                }
                style={{ border: "2px solid white" }}
                className="w-full h-auto md:object-cover rounded-lg"
                src={section.image || "https://via.placeholder.com/150"}
                alt={section.heading?.[language] || "Image"}
              />
            </div>
            <div className="md:w-1/2 w-full">
              <p
                style={{ fontSize: `${fontSize}px` }}
                className="text-justify"
                ref={(el) => (paraRefs.current[index] = el)}
              >
                {splitTexts[index]?.first || section.text?.[language] || "No text"}
              </p>
            </div>
          </div>
          {isDesktop && splitTexts[index]?.second && (
            <div className="text-justify">
              <p style={{ fontSize: `${fontSize}px` }}>
                {splitTexts[index].second}
              </p>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={toggleSpeech}
        disabled={!story?.part?.length || !voicesLoaded}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          padding: "12px 24px",
          background:
            !story?.part?.length || !voicesLoaded
              ? "#6c757d"
              : isSpeaking
              ? "#dc3545"
              : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor:
            story?.part?.length && voicesLoaded ? "pointer" : "not-allowed",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          fontSize: "16px",
          fontWeight: "bold",
          opacity: story?.part?.length && voicesLoaded ? 1 : 0.5,
        }}
      >
        {!story?.part?.length || !voicesLoaded
          ? "Loading..."
          : isSpeaking
          ? "Stop"
          : "Read"}
      </button>
    </>
  );
};

export default YourComponent;

// TODO: fix back voice stop

// import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
// import { useSelector } from "react-redux";

// const YourComponent = ({ story, language }) => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const isDesktop = windowWidth > 770;
//   const { fontSize, theme } = useSelector((state) => state.readerSettings);

//   const imageRefs = useRef([]);
//   const paraRefs = useRef([]);
//   const [splitTexts, setSplitTexts] = useState([]);
//   const [imagesLoaded, setImagesLoaded] = useState({});

//   // TTS state
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const shouldStop = useRef(false);
//   const [voices, setVoices] = useState([]);

//   // Debounced resize handler
//   const handleResize = useCallback(() => {
//     const timeout = setTimeout(() => {
//       setWindowWidth(window.innerWidth);
//     }, 100);
//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [handleResize]);

//   // Load voices
//   useEffect(() => {
//     const loadVoices = () => {
//       const availableVoices = window.speechSynthesis.getVoices();
//       setVoices(availableVoices);
//       console.log("Available voices:", availableVoices);
//     };

//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//     return () => {
//       window.speechSynthesis.onvoiceschanged = null;
//     };
//   }, []);

//   // Handle language change
//   useEffect(() => {
//     if (isSpeaking) {
//       stopSpeech();
//       readText();
//     }
//   }, [language]);

//   // Split text based on image height
//   useLayoutEffect(() => {
//     const calculateSplitTexts = () => {
//       const newSplitTexts = (story?.part || []).map((section, i) => {
//         const imageEl = imageRefs.current[i];
//         const paraEl = paraRefs.current[i];

//         if (!isDesktop || !imageEl || !paraEl || !imagesLoaded[i]) {
//           return {
//             first: section.text?.[language] || "",
//             second: "",
//           };
//         }

//         const imageHeight = imageEl.getBoundingClientRect().height + 23;
//         const paraText = section.text?.[language] || "";
//         const words = paraText.split(" ");

//         const tempEl = document.createElement("p");
//         tempEl.style.fontSize = `${fontSize}px`;
//         tempEl.style.visibility = "hidden";
//         tempEl.style.position = "absolute";
//         tempEl.style.width = `${paraEl.getBoundingClientRect().width}px`;
//         tempEl.style.lineHeight = getComputedStyle(paraEl).lineHeight;
//         document.body.appendChild(tempEl);

//         let currentText = "";
//         let overflowText = "";

//         for (let j = 0; j < words.length; j++) {
//           const testText = currentText + words[j] + " ";
//           tempEl.textContent = testText;

//           if (tempEl.getBoundingClientRect().height > imageHeight) {
//             overflowText = words.slice(j).join(" ");
//             break;
//           }
//           currentText = testText;
//         }

//         document.body.removeChild(tempEl);

//         return {
//           first: currentText.trim(),
//           second: overflowText.trim(),
//         };
//       });

//       setSplitTexts(newSplitTexts);
//     };

//     calculateSplitTexts();
//   }, [isDesktop, story, language, imagesLoaded, fontSize, theme]);

//   // Simplified text-to-speech
//   const readText = async () => {
//     if (isSpeaking) {
//       console.log("TTS already in progress");
//       return;
//     }
//     if (!story?.part?.length) {
//       console.warn("No story parts available for TTS");
//       return;
//     }

//     setIsSpeaking(true);
//     shouldStop.current = false;

//     for (let i = 0; i < story.part.length; i++) {
//       if (shouldStop.current) {
//         console.log("TTS stopped by user");
//         break;
//       }

//       const text = story.part[i].text?.[language];
//       if (!text || typeof text !== "string") {
//         console.warn(`Skipping part ${i}: No valid text for language '${language}'`);
//         continue;
//       }

//       console.log(`Reading part ${i}: ${text}`);
//       await new Promise((resolve) => {
//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.lang = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-US";

//         // Set voice if available
//         const voice = voices.find(
//           (v) => v.lang === (language === "te" ? "te-IN" : "en-US")
//         );
//         if (voice) {
//           utterance.voice = voice;
//           console.log(`Using voice: ${voice.name}`);
//         } else {
//           console.warn(`No voice found for ${language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-US"}`);
//         }

//         utterance.onstart = () => console.log(`TTS started for part ${i}`);
//         utterance.onend = () => {
//           console.log(`TTS ended for part ${i}`);
//           resolve();
//         };
//         utterance.onerror = (e) => {
//           console.error(`TTS error for part ${i}:`, e);
//           resolve();
//         };
//         window.speechSynthesis.cancel(); // Clear any existing speech
//         window.speechSynthesis.speak(utterance);
//       });
//     }

//     setIsSpeaking(false);
//     shouldStop.current = false;
//   };

//   // Stop speech
//   const stopSpeech = () => {
//     if (isSpeaking) {
//       console.log("Stopping TTS");
//       window.speechSynthesis.cancel();
//       setIsSpeaking(false);
//       shouldStop.current = true;
//     }
//   };

//   // Toggle read/stop
//   const toggleSpeech = () => {
//     if (isSpeaking) {
//       stopSpeech();
//     } else {
//       readText();
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       stopSpeech();
//     };
//   }, []);

//   // Debug story data
//   useEffect(() => {
//     console.log("Story data:", story);
//     console.log("Language:", language);
//   }, [story, language]);

//   return (
//     <>
//       {(story?.part || []).map((section, index) => (
//         <div key={section.id} className="mt-6">
//           <p
//             style={{ fontSize: `${fontSize + 2}px` }}
//             className="font-bold mb-[5px]"
//           >
//             {`${index + 1})`} {section.heading?.[language] || "No heading"}:{" "}
//             <span className="italic font-normal">
//               {section.quote?.[language] || "No quote"}
//             </span>
//           </p>
//           <div
//             className={`pt-2 flex flex-col md:flex-row ${
//               index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//             } items-start gap-6`}
//           >
//             <div className="md:w-1/2 w-full">
//               <img
//                 ref={(el) => (imageRefs.current[index] = el)}
//                 onLoad={() =>
//                   setImagesLoaded((prev) => ({ ...prev, [index]: true }))
//                 }
//                 style={{ border: "2px solid white" }}
//                 className="w-full h-auto md:object-cover rounded-lg"
//                 src={section.image || "https://via.placeholder.com/150"}
//                 alt={section.heading?.[language] || "Image"}
//               />
//             </div>
//             <div className="md:w-1/2 w-full">
//               <p
//                 style={{ fontSize: `${fontSize}px` }}
//                 className="text-justify"
//                 ref={(el) => (paraRefs.current[index] = el)}
//               >
//                 {splitTexts[index]?.first || section.text?.[language] || "No text"}
//               </p>
//             </div>
//           </div>
//           {isDesktop && splitTexts[index]?.second && (
//             <div className="text-justify">
//               <p style={{ fontSize: `${fontSize}px` }}>
//                 {splitTexts[index].second}
//               </p>
//             </div>
//           )}
//         </div>
//       ))}
//       <button
//         onClick={toggleSpeech}
//         disabled={!story?.part?.length}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           left: "20px",
//           padding: "12px 24px",
//           background: !story?.part?.length
//             ? "#6c757d"
//             : isSpeaking
//             ? "#dc3545"
//             : "#28a745",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: story?.part?.length ? "pointer" : "not-allowed",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//           zIndex: 1000,
//           fontSize: "16px",
//           fontWeight: "bold",
//           opacity: story?.part?.length ? 1 : 0.5,
//         }}
//       >
//         {!story?.part?.length ? "Loading..." : isSpeaking ? "Stop" : "Read"}
//       </button>
//     </>
//   );
// };

// export default YourComponent;


// TODO: fix voice

// import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
// import { useSelector } from "react-redux";

// const YourComponent = ({ story, language }) => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const isDesktop = windowWidth > 770;
//   const { fontSize, theme } = useSelector((state) => state.readerSettings);

//   const imageRefs = useRef([]);
//   const paraRefs = useRef([]);
//   const [splitTexts, setSplitTexts] = useState([]);
//   const [imagesLoaded, setImagesLoaded] = useState({});

//   // Debounced resize handler
//   const handleResize = useCallback(() => {
//     const timeout = setTimeout(() => {
//       setWindowWidth(window.innerWidth);
//     }, 100);
//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [handleResize]);

//   // Split text based on image height
//   useLayoutEffect(() => {
//     const calculateSplitTexts = () => {
//       const newSplitTexts = story.part.map((section, i) => {
//         const imageEl = imageRefs.current[i];
//         const paraEl = paraRefs.current[i];

//         if (!isDesktop || !imageEl || !paraEl || !imagesLoaded[i]) {
//           return {
//             first: section.text[language],
//             second: "",
//           };
//         }

//         const imageHeight = imageEl.getBoundingClientRect().height + 23;
//         const paraText = section.text[language];
//         const words = paraText.split(" ");

//         // Create a temporary element to measure text height
//         const tempEl = document.createElement("p");
//         tempEl.style.fontSize = `${fontSize}px`;
//         tempEl.style.visibility = "hidden";
//         tempEl.style.position = "absolute";
//         tempEl.style.width = `${paraEl.getBoundingClientRect().width}px`;
//         tempEl.style.lineHeight = getComputedStyle(paraEl).lineHeight;
//         document.body.appendChild(tempEl);

//         let currentText = "";
//         let overflowText = "";

//         for (let j = 0; j < words.length; j++) {
//           const testText = currentText + words[j] + " ";
//           tempEl.textContent = testText;

//           if (tempEl.getBoundingClientRect().height > imageHeight) {
//             overflowText = words.slice(j).join(" ");
//             break;
//           }
//           currentText = testText;
//         }

//         document.body.removeChild(tempEl);

//         return {
//           first: currentText.trim(),
//           second: overflowText.trim(),
//         };
//       });

//       setSplitTexts(newSplitTexts);
//     };

//     calculateSplitTexts();
//   }, [isDesktop, story, language, imagesLoaded, fontSize, theme]);

//   return (
//     <>
//       {story.part.map((section, index) => (
//         <div key={section.id} className="mt-6">
//           <p
//             style={{ fontSize: `${fontSize + 2}px` }}
//             className="font-bold mb-[5px]"
//           >
//             {`${index + 1})`} {section.heading[language]}:{" "}
//             <span className="italic font-normal">{section.quote[language]}</span>
//           </p>
//           <div
//             className={`pt-2 flex flex-col md:flex-row ${
//               index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//             } items-start gap-6`}
//           >
//             <div className="md:w-1/2 w-full">
//               <img
//                 ref={(el) => (imageRefs.current[index] = el)}
//                 onLoad={() =>
//                   setImagesLoaded((prev) => ({ ...prev, [index]: true }))
//                 }
//                 style={{ border: "2px solid white" }}
//                 className="w-full h-auto md:object-cover rounded-lg"
//                 src={section.image}
//                 alt={section.heading[language]}
//               />
//             </div>
//             <div className="md:w-1/2 w-full">
//               <p
//                 style={{ fontSize: `${fontSize}px` }}
//                 className="text-justify"
//                 ref={(el) => (paraRefs.current[index] = el)}
//               >
//                 {splitTexts[index]?.first || section.text[language]}
//               </p>
//             </div>
//           </div>
//           {isDesktop && splitTexts[index]?.second && (
//             <div className="text-justify">
//               <p style={{ fontSize: `${fontSize}px` }}>
//                 {splitTexts[index].second}
//               </p>
//             </div>
//           )}
//         </div>
//       ))}
//     </>
//   );
// };

// export default YourComponent;

// TODO: remove the repeating text in split

// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";

// const YourComponent = ({ story, language }) => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const isDesktop = windowWidth > 770;

//   const imageRefs = useRef([]);
//   const paraRefs = useRef([]);
//   const [splitTexts, setSplitTexts] = useState([]);
//   const [imagesLoaded, setImagesLoaded] = useState({});
//   const { fontSize, theme } = useSelector((state) => state.readerSettings);

//   console.log(splitTexts,"check splitTexts")
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [fontSize, theme]);

//   useLayoutEffect(() => {
//     const newSplitTexts = story.part.map((section, i) => {
//       const imageEl = imageRefs.current[i];
//       const paraEl = paraRefs.current[i];

//       if (isDesktop && imageEl && paraEl && imagesLoaded[i]) {
//         const imageHeight = imageEl.clientHeight;
//         console.log(imageHeight, "imageHeight");
//         const paraText = section.text[language];
//         const words = paraText.split(" ");
//         console.log(words, "check word");

//         let currentText = "";
//         let overflowText = "";
//         paraEl.innerText = "";

//         for (let j = 0; j < words.length; j++) {
//           paraEl.innerText = currentText + words[j] + " ";
//           if (paraEl.clientHeight > imageHeight) {
//             overflowText = words.slice(j).join(" ");
//             break;
//           }
//           currentText += words[j] + " ";
//         }

//         return {
//           first: currentText.trim(),
//           second: overflowText.trim(),
//         };
//       } else {
//         return {
//           first: section.text[language],
//           second: "",
//         };
//       }
//     });

//     setSplitTexts(newSplitTexts);
//     // console.log(newSplitTexts,"check splittext")
//     console.log(splitTexts[0]?.first.split(" "), "check length split")
//     console.log(splitTexts[0]?.second.split(" "), "check length split")
//   }, [isDesktop, story, language, windowWidth, imagesLoaded, fontSize, theme]);

//   return (
//     <>
//       {story.part.map((section, index) => (
//         <div>
//           <div className="mt-6 flex items-start">
//             <p style={{fontSize:`${fontSize+2}px`}} className="font-bold mb-[5px]">{index+1}{`)`} {section.heading[language]}: <span className="italic font-normal">{section.quote[language]}</span></p>
            
//           </div>
//           <div key={section.id}>
//             <div
//               className={`pt-2 h-fit flex flex-col md:flex-row ${
//                 index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//               } items-start gap-6`}
//             >
//               <div className="md:w-1/2 w-full">
//                 <img
//                   ref={(el) => (imageRefs.current[index] = el)}
//                   onLoad={() =>
//                     setImagesLoaded((prev) => ({ ...prev, [index]: true }))
//                   }
//                   style={{border:"2px solid white"}}
//                   className="w-full h-auto md:object-cover rounded-lg"
//                   src={section.image}
//                   alt="image"
//                 />
//               </div>

//               <div className="md:w-1/2 w-full">
//                 <p
//                   className="text-justify"
//                   ref={(el) => (paraRefs.current[index] = el)}
//                   >
//                   {splitTexts[index]?.first}
//                 </p>
//               </div>
//             </div>

//             {isDesktop && splitTexts[index]?.second && (
//               <div className="text-justify">
//                 {splitTexts[index].second}
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default YourComponent;

// FIXME: fix the issue

// import { useEffect, useLayoutEffect, useRef, useState } from "react";

// const YourComponent = ({ story, language }) => {
//   console.log(story, language, "story, language");
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const isDesktop = windowWidth > 770;

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       {story.part.map((section, index) => {
//         const imageRef = useRef(null);
//         const paraRef = useRef(null);
//         const [splitText, setSplitText] = useState({ first: "", second: "" });
//         const [imageLoaded, setImageLoaded] = useState(false);

//         useLayoutEffect(() => {
//           if (isDesktop && imageRef.current && paraRef.current && imageLoaded) {
//             const imageHeight = imageRef.current.clientHeight;
//             const paraText = section.text[language];
//             const words = paraText.split(" ");

//             let currentText = "";
//             let overflowText = "";
//             paraRef.current.innerText = "";

//             for (let i = 0; i < words.length; i++) {
//               paraRef.current.innerText = currentText + words[i] + " ";
//               if (paraRef.current.clientHeight > imageHeight) {
//                 overflowText = words.slice(i).join(" ");
//                 break;
//               }
//               currentText += words[i] + " ";
//             }

//             setSplitText({
//               first: currentText.trim(),
//               second: overflowText.trim(),
//             });
//           } else if (!isDesktop) {
//             // For smaller screens, show full text in one para
//             setSplitText({ first: section.text[language], second: "" });
//           }
//         }, [isDesktop, section.text, language, windowWidth, imageLoaded]);

//         return (
//           <div key={section.id}>
//             <div
//               className={`py-[10px] flex flex-col md:flex-row ${
//                 index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//               } items-start gap-6`}
//             >
//               <div className="md:w-1/2 w-full">
//                 <img
//                   ref={imageRef}
//                   onLoad={() => setImageLoaded(true)}
//                   className="w-full h-auto md:object-cover rounded-lg"
//                   src={section.image}
//                   alt="image"
//                 />
//               </div>

//               <div className="md:w-1/2 w-full">
//                 <h3 className="font-bold mb-[5px]">
//                   {section.heading[language]}:
//                 </h3>
//                 <p className="mb-[15px]">{section.quote[language]}</p>
//                 <p className="text-justify" ref={paraRef}>
//                   {splitText.first}
//                 </p>
//               </div>
//             </div>

//             {isDesktop && splitText.second && (
//               <div className="text-justify mt-2 px-2">{splitText.second}</div>
//             )}
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default YourComponent;
