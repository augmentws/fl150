"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function Toggle() {
  const { setTheme, resolvedTheme } = useTheme();

    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      >
          <Sun
            className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${resolvedTheme === "dark" ? "-rotate-90 scale-0" : ""}`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ${resolvedTheme === "dark" ? "rotate-0 scale-100" : ""}`}
          />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
}