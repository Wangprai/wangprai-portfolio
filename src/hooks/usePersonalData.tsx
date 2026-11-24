import { useContext } from "react";
import { PersonalDataContext } from "../context/PersonalDataContext";

export const usePersonalData = () => {
  const ctx = useContext(PersonalDataContext);
  if (!ctx) {
    throw new Error("usePersonalData must be used within PersonalDataProvider");
  }
  return ctx;
};
