import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { set } from "zod";

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const toggleTheme = () =>
      theme === "light" ? setTheme("dark") : setTheme("light");

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <MoonStar
          className="h-9 w-9 cursor-pointer transition hover:scale-125"
          onClick={toggleTheme}
        />
      );
    } else {
      return (
        <Sun
          className="h-9 w-9 cursor-pointer transition hover:scale-125"
          onClick={toggleTheme}
        />
      );
    }
  };

  return (
    <div className="container grid h-16 grid-cols-3 grid-rows-1 py-4">
      <div className="col-span-1 col-start-2 justify-self-center">
        <h1 className="scroll-m-20  text-4xl font-extrabold tracking-tight transition hover:text-[2.5rem] hover:tracking-wide lg:text-5xl hover:lg:text-6xl hover:lg:text-[3.25rem]">
          #todo
        </h1>
      </div>
      <div className="col-span-1 col-start-3 flex items-center gap-x-4 justify-self-end">
        {renderThemeChanger()}
        <h2>hello</h2>
      </div>
    </div>
  );
};

export default Header;
