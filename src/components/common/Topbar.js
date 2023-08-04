
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate  } from 'react-router-dom'; 
import { Link } from "react-router-dom";

const removeDataFromLocalStorage = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
    // You can also use localStorage.removeItem("myData") if using double quotes.
  };
function Topbar() {
  return (
    <>
      <header className="dash-toolbar">
        <a href="#" className="menu-toggle">
          <i className="fas fa-bars" />
        </a>
        <a href="#" className="searchbox-toggle">
          <i className="fas fa-search" />
        </a>
        <form className="searchbox" action="">
          <a href="#" className="searchbox-toggle">
            {" "}
            <i className="fas fa-arrow-left" />{" "}
          </a>
          <button type="submit" className="searchbox-submit">
            {" "}
            <i className="fas fa-search" />{" "}
          </button>
          <input
            type="text"
            className="searchbox-input"
            placeholder="type to search"
          />
        </form>
        <div className="tools">
         
          <div className="dropdown tools-item">
            <a
              href="#"
              className
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenu1"
            >
              {/* <a className="dropdown-item" href="">
                Profile
              </a> */}
              <a className="dropdown-item" href="#l" onClick={removeDataFromLocalStorage}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Topbar;
