
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate  } from 'react-router-dom'; 
import { Link } from "react-router-dom";

function Leftbarnav() {
    
    const navigate =useNavigate();
    const [token, setToken] = useState(true);
    const removeDataFromLocalStorage = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.href = "/";
        // You can also use localStorage.removeItem("myData") if using double quotes.
      };
      
    return (
      <>
        <nav className="dash-nav-list">
            <a className="dash-nav-item">
                <i className="fas fa-home" /> <Link to="/admin-dashboard">Dashboard</Link> 
            </a>
            <div className="dash-nav-dropdown">
                <a href="#!" className="dash-nav-item dash-nav-dropdown-toggle">
                    <i className="fas fa-chart-bar" /> Product </a>
                <div className="dash-nav-dropdown-menu">
                    <a className="dash-nav-dropdown-item"><Link to="/testimonials">Products</Link> </a>
                </div>
                <div className="dash-nav-dropdown-menu">
                    <a className="dash-nav-dropdown-item"><Link to="/instagram-post">Products 1</Link> </a>
                </div>
            </div>
            <div className="dash-nav-dropdown ">
            <a href="#!" className="dash-nav-item dash-nav-dropdown-toggle">
                <i className="fas fa-cube" /> Components </a>
            <div className="dash-nav-dropdown-menu">
                <a className="dash-nav-dropdown-item"><Link to="/datatable">Datatable</Link> </a>
                <a href="forms.html" className="dash-nav-dropdown-item">Forms</a>
                <div className="dash-nav-dropdown ">
                <a href="#" className="dash-nav-dropdown-item dash-nav-dropdown-toggle">Icons</a>
                <div className="dash-nav-dropdown-menu">
                    <a href="icons.html" className="dash-nav-dropdown-item">Solid Icons</a>
                    <a href="icons.html#regular-icons" className="dash-nav-dropdown-item">Regular Icons</a>
                    <a href="icons.html#brand-icons" className="dash-nav-dropdown-item">Brand Icons</a>
                </div>
                </div>
                <a href="stats.html" className="dash-nav-dropdown-item">Stats</a>
                <a href="tables.html" className="dash-nav-dropdown-item">Tables</a>
                <a href="typography.html" className="dash-nav-dropdown-item">Typography</a>
                <a href="userinterface.html" className="dash-nav-dropdown-item">User Interface</a>
            </div>
            </div>
            <div className="dash-nav-dropdown">
            <a href="#!" className="dash-nav-item dash-nav-dropdown-toggle">
                <i className="fas fa-file" /> Layouts </a>
            <div className="dash-nav-dropdown-menu">
                <a href="blank.html" className="dash-nav-dropdown-item">Blank</a>
                <a href="content.html" className="dash-nav-dropdown-item">Content</a>
                <a href="login.html" className="dash-nav-dropdown-item">Log in</a>
                <a href="signup.html" className="dash-nav-dropdown-item">Sign up</a>
            </div>
            </div>
            <div className="dash-nav-dropdown">
                <a href="#!" className="dash-nav-item dash-nav-dropdown-toggle">
                     <i className="fas fa-info" /> About 
                </a>
                <div className="dash-nav-dropdown-menu">
                    <a href="https://github.com/HackerThemes/spur-template" target="_blank" className="dash-nav-dropdown-item">GitHub</a>
                    <a href="http://hackerthemes.com" target="_blank" className="dash-nav-dropdown-item">HackerThemes</a>
                </div>
            </div>
            <a className="dash-nav-item">
                <i className="fas fa-home" /> <button onClick={removeDataFromLocalStorage}>Remove Data</button>
            </a>
        </nav>
      </>
    );
  }
  
  export default Leftbarnav;