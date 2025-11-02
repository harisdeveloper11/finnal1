import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const ScrollButton = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
      setAtBottom(scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center shadow-lg overflow-hidden z-50"
      aria-label="Scroll Button"
    >
      {/* progress fill */}
      <span
        className="absolute top-0 left-0 h-full bg-indigo-500"
        style={{ width: `${scrollPercent}%` }}
      ></span>

      {/* arrow icon */}
      <span className="relative z-10 text-gray-800">
        {atBottom ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
      </span>
    </button>
  );
};

export default ScrollButton;
