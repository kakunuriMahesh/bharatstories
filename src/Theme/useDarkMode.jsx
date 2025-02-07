import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return [isDark, setIsDark];
}
// export  function language() {
//   const [isLanguage, setIsLanguage] = useState(() => {
//     return localStorage.getItem("language") === "Eng";
//   });

//   useEffect(() => {
//     if (isDark) {
//       // document.documentElement.classList.add("dark");
//       localStorage.setItem("language", "Eng");
//     } else {
//       // document.documentElement.classList.remove("dark");
//       localStorage.setItem("language", "Tel");
//     }
//   }, [isLanguage]);

//   return [isLanguage, setIsLanguage];
// }
// Compare this snippet from my-vue-app/src/Content/ViewContent.jsx: