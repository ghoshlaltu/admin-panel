import React from 'react';

import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

import Nav from '../common/Leftbarnav';
import Topbar from '../common/Topbar';
import TopbarlogoSection from '../common/TopbarlogoSection';

import DashboardView from './Dashboard';
import ProductsView from './Products';


function MainDashboardContent() {
    return (
      <>
         <Router>
          <div className="dash">
            <div className="dash-nav dash-nav-dark">
              <TopbarlogoSection/>

              <Nav/>
            </div>

            <div className="dash-app">
              <Topbar/>

              <Routes>
                <Route path="/admin-dashboard" element = {<DashboardView/> }/> 
                <Route path="/products" element = {<ProductsView/> }/> 
              </Routes> 

            </div>
          </div>
          </Router>
      </>
    );
  }
  
  export default MainDashboardContent;