import { useEffect, useState } from "react";
import { TodoList } from "./pages/TodoList";
import moonIcon from "./assets/icons/lucide--moon.svg";
import sunIcon from "./assets/icons/lucide--sun.svg";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="transition-all duration-300">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <img
            src={darkMode ? sunIcon : moonIcon}
            alt={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`w-5 h-5 ${
              darkMode
                ? "brightness-0 invert-[87%] sepia-0 saturate-0 hue-rotate-0 brightness-[100%] contrast-[89%]" // สีขาว/เทาอ่อน สำหรับ sun icon
                : "brightness-0 invert-[47%] sepia-[6%] saturate-[24%] hue-rotate-[314deg] brightness-[98%] contrast-[86%]" // สีเทาเข้ม สำหรับ moon icon
            }`}
          />
        </button>
      </div>
      <TodoList />
    </div>
  );
}
