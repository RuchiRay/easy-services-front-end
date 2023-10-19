import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [bookingDetails, setbookingDetails] = useState({
    brand: "",
    models: [],
    selectedModel: "",
    services: [],
    shift: "",
    date: "",
    time: "",
   
  });

  return (
    <AppContext.Provider value={{ bookingDetails, setbookingDetails }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
