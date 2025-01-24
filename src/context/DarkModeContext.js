// DarkModeContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { Get } from "../services/user.services";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const [profileData, setProfileData] = useState({});
  const [navColor, setNavColor] = useState("");
  const [profileChange, setProfileChange] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [adminPreRegistrationEmail, setAdminPreRegistrationEmail] = useState("")
  // const [onBoardData, setOnBoardData] = useState({});

  const [registrationDetails, setRegistrationDetails] = useState({
    first_name: "",
    last_name: "",
    designation_id: "",
    password: "",
    cnfm_password: "",
  });

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
  };

  const disableDarkMode = () => {
    const newMode = false;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
  };

  const getProfileData = async () => {
    try {
      const data = await Get("mediahouse/getProfile");
      setProfileData(data.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [isDarkMode, profileChange]);

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        disableDarkMode,
        profileData,
        setProfileChange,
        registrationDetails,
        setRegistrationDetails,
        cartCount,
        setCartCount,
        adminPreRegistrationEmail,
        setAdminPreRegistrationEmail,
        navColor,
        setNavColor
        // onBoardData,
        // setOnBoardData,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
