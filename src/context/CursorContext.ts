import { createContext } from "react";

export interface CursorContextType {
  /** User preference for the custom cursor (persisted). */
  enabled: boolean;
  toggleCursor: () => void;
  setCursorEnabled: (enabled: boolean) => void;
}

export const CursorContext = createContext<CursorContextType | null>(null);
