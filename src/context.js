import React, { useState, useContext } from "react";

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
  const [slotInfo, setSlotInfo] = useState(null)
  return (
    <AppContext.Provider value={{ bookingDetails, setbookingDetails, slotInfo, setSlotInfo }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
