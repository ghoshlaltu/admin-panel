import React from 'react';

function Topbar() {
  return (
    <>
    <header className="dash-toolbar">
        <a href="#!" className="menu-toggle">
            <i className="fas fa-bars" />
        </a>
        <a href="#!" className="searchbox-toggle">
            <i className="fas fa-search" />
        </a>
        <form className="searchbox" action="#!">
            <a href="#!" className="searchbox-toggle"> <i className="fas fa-arrow-left" /> </a>
            <button type="submit" className="searchbox-submit"> <i className="fas fa-search" /> </button>
            <input type="text" className="searchbox-input" placeholder="type to search" />
        </form>
        <div className="tools">
            <a href="https://github.com/HackerThemes/spur-template" target="_blank" className="tools-item">
            <i className="fab fa-github" />
            </a>
            <a href="#!" className="tools-item">
            <i className="fas fa-bell" />
            <i className="tools-item-count">4</i>
            </a>
            <div className="dropdown tools-item">
            <a href="#" className id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-user" />
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                <a className="dropdown-item" href="#!">Profile</a>
                <a className="dropdown-item" href="login.html">Logout</a>
            </div>
            </div>
        </div>
    </header>
    </>
  );
}

export default Topbar;
