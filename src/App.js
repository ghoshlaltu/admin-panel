import React, { useState, useEffect } from 'react';

import './App.css'; // added again  test 1

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';

// import MainDashboardView from './components/pages/MainDashboardContent'; /// 
import Login from './components/Login';

import Nav from './components/common/Leftbarnav';
import Topbar from './components/common/Topbar';
import TopbarlogoSection from './components/common/TopbarlogoSection';

import DashboardView from './components/pages/Dashboard';
import Testimonials from './components/pages/Testimonials';
import MDDatatable from './components/pages/MDDatatable';
import InstagramPost from './components/pages/InstagramPost';
import Stories from './components/pages/Stories';
import StoriesPosts from './components/pages/StoriesPosts';
import Films from './components/pages/Films';
import StorySliders from './components/pages/StorySliders';
import StoryComments from './components/pages/StoryComments';
import ContactMessages from './components/pages/ContactMessages';
import Faq from './components/pages/Faq';
import Siteinfo from './components/pages/Siteinfo';

function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(true);
  // const storedToken = localStorage.getItem('token');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(true);
    }else{
      setToken(false);
    }
  }, []);
  //console.log(token);
  return (
    <>
     {token ? (
      
        <div className="dash">
          <div className="dash-nav dash-nav-dark">
            <TopbarlogoSection/>

            <Nav/>
          </div>

          <div className="dash-app">
            <Topbar/>

            <Routes>
              {/* if its users   */}
              <Route path="/admin-dashboard" element = {<DashboardView/> }/> 
              <Route path="/testimonials" element = {<Testimonials/> }/> 
              <Route path="/instagram-post" element = {<InstagramPost/> }/> 
              <Route path="/datatable" element = {<MDDatatable/> }/> 
              <Route path="/stories" element = {<Stories/> }/> 
              <Route path="/stories-post/:stories_id" element={<StoriesPosts />} />
              <Route path="/films" element = {<Films/> }/> 
              <Route path="/story-sliders" element = {<StorySliders/> }/> 
              <Route path="/story-comments" element = {<StoryComments/> }/> 
              <Route path="/contact-messages" element = {<ContactMessages/> }/> 
              <Route path="/faqs" element = {<Faq/> }/> 
              <Route path="/site-info" element = {<Siteinfo/> }/> 

              {/* if admin  */}

            </Routes> 

          </div>
        </div>
        
        // <p>{token}</p>
      ) : (
        
        <Login/>
       
        )}

   
    </>
  );
}

export default App;
