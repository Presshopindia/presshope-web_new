// DarkModeContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { Get } from "../services/user.services";
import { useParams } from "react-router-dom";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const param = useParams();
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );

  console.log("Look here", param);
  const [profileData, setProfileData] = useState({});
  const [navColor, setNavColor] = useState("");
  console.log("navColor", navColor)
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

  useEffect(() => {
    setNavColor(window.location.pathname);
  }, [window.location.pathname]);

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
