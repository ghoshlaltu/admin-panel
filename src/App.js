import React, { useState, useEffect } from 'react';

import './App.css'; // added again  test 1

import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';

import MainDashboardView from './components/pages/MainDashboardContent';


function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const storedToken = localStorage.getItem('token');
  // console.log('Token retrieved from local storage:', storedToken);

  const onSubmit = (data) => {
    var formvalues = JSON.stringify(data);
   
    //console.log(data);
    const article = { email: data.email, password: data.password };


    axios.post('http://127.0.0.1:8000/api/login', article)
    .then(result => {
        const bearerToken = result.data.data.token;

        // Store the token in the component's state
        setToken(bearerToken);
        localStorage.setItem('token', bearerToken);
      
      }).catch(error => {
        // this.setState({ errorMessage: error.message });
        // console.log(error);
        alert('Username or password do not match... !');
        // console.error('There was an error!', error);
    });
  };

  return (
    <>
     {storedToken ? (
        <MainDashboardView/>
        
        // <p>{token}</p>
      ) : (
        <div className="form-screen">
            <a href="index-2.html" className="spur-logo"><i className="fas fa-bolt"></i> <span>Spur</span></a>
            <div className="card account-dialog">
                <div className="card-header bg-primary text-white"> Please sign in </div>
                <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input type="email"  {...register("email", { required: true })} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" {...register("password", { required: true })} id="password" placeholder="Password"/>
                            {errors.password && <span>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            </div>
                        </div>
                        <div className="account-dialog-actions">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )}

   
    {/* {isLoggedIn ? (
        <p>You are not logged in!</p>
      ) : (
        <Router>
          <div className="dash">
            <div className="dash-nav dash-nav-dark">
              <TopbarlogoSection/>

              <Nav/>
            </div>

            <div className="dash-app">
              <Topbar/>

              <Routes>
                <Route path="/dashboard-view" element = {<MainDashboardView/> }/> 
                <Route path="/products" element = {<ProductsView/> }/> 
              </Routes> 

            </div>
          </div>
          </Router>
          )} */}
     
    </>
  );
}

export default App;
