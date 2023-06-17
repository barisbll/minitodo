import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";

const Todo = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  return <header className="flex h-16 items-center justify-between"></header>;
};

export default Todo;
