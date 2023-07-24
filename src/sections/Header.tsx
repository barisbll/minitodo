import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { AccountMenu } from "~/components/AccountMenu";

export const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <MoonStar
          className="h-9 w-9 cursor-pointer transition hover:scale-110 max-sm:hidden"
          onClick={toggleTheme}
        />
      );
    } else {
      return (
        <Sun
          className="h-9 w-9 cursor-pointer transition hover:scale-110 max-sm:hidden"
          onClick={toggleTheme}
        />
      );
    }
  };

  return (
    <div className="container my-3 grid h-16 grid-cols-3 grid-rows-1">
      <div className="col-span-1 col-start-2 self-center justify-self-center">
        <h1 className="scroll-m-20  text-4xl font-extrabold tracking-tight transition-all hover:text-[2.5rem] hover:tracking-wide lg:text-5xl hover:lg:text-6xl hover:lg:text-[3.25rem]">
          #minitodo
        </h1>
      </div>
      <div className="col-span-1 col-start-3 flex items-center gap-x-4 justify-self-end">
        {renderThemeChanger()}
        <AccountMenu theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};
