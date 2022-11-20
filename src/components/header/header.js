import { Box } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import Navigation from "../navigation/navigation";
import HeaderContent from "./header-content/header-content";
import HeaderTopBar from "./header-topbar/header-topbar";

const Header = ({ open, setActiveMenu }) => {
  const auth = useContext(AuthContext);

  const renderTopBar = auth.isAuthenticated ? <HeaderTopBar /> : null;

  return (
    <Box component="header">
      {renderTopBar}
      <HeaderContent open={open} setActiveMenu={setActiveMenu} />
      <Navigation open={open} setActiveMenu={setActiveMenu} />
    </Box>
  );
};

export default Header;
