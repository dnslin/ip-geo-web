import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const newIsDark = e.matches;
      setIsDark(newIsDark);
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
      if (newIsDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    darkModeMediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, [isDark]);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  return { isDark, toggleDarkMode };
}
