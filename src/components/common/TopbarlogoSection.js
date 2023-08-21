import React from 'react';
import Wedrise_logo from './../../Wedrise_logo.jpg'

function TopbarlogoSection() {
    return (
      <>
        <header>
            <a href="#!" className="menu-toggle">
            <i className="fas fa-bars" />
            </a>
            <a href="/admin-dashboard" className="spur-logo"> <img src={Wedrise_logo} className="lgo" alt="logo" />      </a>
        </header>
      </>
    );
  }
  
  export default TopbarlogoSection;