"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="rounded-full"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size="icon"
      variant="ghost"
    >
      <Sun className="dark:-rotate-90 size-5 rotate-0 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
