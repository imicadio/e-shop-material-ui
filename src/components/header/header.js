import React from 'react'
import HeaderContent from './header-content/header-content';
import HeaderTopBar from './header-topbar/header-topbar';

const Header = () => {
  return (
    <React.Fragment>
        <HeaderTopBar />
        <HeaderContent />
    </React.Fragment>
  )
}

export default Header;