import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { CursorContext } from "../context/CursorContext";

const STORAGE_KEY = "portfolio-custom-cursor";

function getInitialEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState<boolean>(getInitialEnabled);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    } catch {
      // Ignore storage access failures
    }
  }, [enabled]);

  const toggleCursor = useCallback(() => setEnabled((prev) => !prev), []);
  const setCursorEnabled = useCallback((next: boolean) => setEnabled(next), []);

  const value = useMemo(
    () => ({ enabled, toggleCursor, setCursorEnabled }),
    [enabled, toggleCursor, setCursorEnabled]
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};
