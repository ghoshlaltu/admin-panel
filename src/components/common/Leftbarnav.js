
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
                <a href="javascript:void(0)" className="dash-nav-item dash-nav-dropdown-toggle">
                    <i className="fas fa-chart-bar" /> Home  </a>
                <div className="dash-nav-dropdown-menu">
                    <a className="dash-nav-dropdown-item"><Link to="/testimonials">Home Testimonials</Link> </a>
                </div>
                <div className="dash-nav-dropdown-menu">
                    <a className="dash-nav-dropdown-item"><Link to="/instagram-post">Instagram Posts</Link> </a>
                </div>
              
            </div>
            
            <div className="dash-nav-dropdown">
                <a href="javascript:void(0)" className="dash-nav-item dash-nav-dropdown-toggle">
                    <i className="fas fa-cubes" /> Story Page  </a>
                
                <div className="dash-nav-dropdown-menu">
                    <a className="dash-nav-dropdown-item"><Link to="/story-sliders">Stories Page Sliders</Link> </a>
                </div>
                <div className="dash-nav-dropdown-menu">
                    <a className="dash-nav-dropdown-item"><Link to="/stories">All Stories</Link> </a>
                </div>
            </div>
            
            <div className="dash-nav-dropdown">
                <a href="javascript:void(0)" className="dash-nav-item dash-nav-dropdown-toggle">
                    <i className="fas fa-building" /> Films Page  </a>
                
                <div className="dash-nav-dropdown-menu">
                    <a className="dash-nav-dropdown-item"><Link to="/films">Films Posts</Link> </a>
                </div>
            </div>

            <div className="dash-nav-dropdown ">
            <a href="javascript:void(0)" className="dash-nav-item dash-nav-dropdown-toggle">
                <i className="fas fa-cube" /> Faqs </a>
            <div className="dash-nav-dropdown-menu">
                {/* <a className="dash-nav-dropdown-item"><Link to="/datatable">Datatable</Link> </a> */}
                <a className="dash-nav-dropdown-item"><Link to="/faqs">Faqs</Link> </a>
                {/* <a href="forms.html" className="dash-nav-dropdown-item">Forms</a>
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
                <a href="userinterface.html" className="dash-nav-dropdown-item">User Interface</a> */}
            </div>
            </div>
            <div className="dash-nav-dropdown">
            <a href="javascript:void(0)" className="dash-nav-item dash-nav-dropdown-toggle">
                <i className="fas fa-file" /> Enquiry Messages </a>
            <div className="dash-nav-dropdown-menu">
                {/* <a className="dash-nav-dropdown-item"><Link to="/story-comments">Products 55</Link> </a> */}
                <a className="dash-nav-dropdown-item"><Link to="/contact-messages">All Enquiries</Link> </a>
            </div>
            </div>
            <div className="dash-nav-dropdown">
                <a href="javascript:void(0)" className="dash-nav-item dash-nav-dropdown-toggle">
                     <i className="fas fa-info" /> Site Info 
                </a>
                <div className="dash-nav-dropdown-menu">
                    <a className="dash-nav-dropdown-item"><Link to="/site-info">Site Info </Link> </a>
                </div>
            </div>
            {/* <a className="dash-nav-item">
                <i className="fas fa-home" /> <button onClick={removeDataFromLocalStorage}>Remove Data</button>
            </a> */}
        </nav>
      </>
    );
  }
  
  export default Leftbarnav;