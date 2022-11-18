import React from "react";
import HeaderContent from "./header-content/header-content";
import HeaderTopBar from "./header-topbar/header-topbar";

const Header = ({ open, setActiveMenu }) => {
  return (
    <React.Fragment>
      <HeaderTopBar />
      <HeaderContent open={open} setActiveMenu={setActiveMenu} />
    </React.Fragment>
  );
};

export default Header;
