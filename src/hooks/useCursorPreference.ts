import { useContext } from "react";
import { CursorContext } from "../context/CursorContext";

export const useCursorPreference = () => {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useCursorPreference must be used within CursorProvider");
  }
  return ctx;
};
