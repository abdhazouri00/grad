import { createContext, useState, useContext } from "react";

// Create the context
const AppContext = createContext();

// Provide the context
export const AppProvider = ({ children }) => {

  const products = ["Srs"]
  

  const value = {
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
