
import React, { useState, useEffect } from 'react';
import BASE_URL from './../config';

import { Routes, Route, useNavigate  } from 'react-router-dom'; 
import { useForm } from "react-hook-form";
import axios from 'axios';

import Wedrise_logo from './../Wedrise_logo.jpg'

function Login() {
  const apiUrl = BASE_URL;
  //console.log(apiUrl);
  const navigate =useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    var formvalues = JSON.stringify(data);
   
    //console.log(data);
    const article = { email: data.email, password: data.password };

    axios.post(apiUrl+'api/login', article)
    .then(result => {
        //console.log(result);
        const bearerToken = result.data.data.token;
        // Store the token in the component's state
        // setToken(bearerToken);
        localStorage.setItem('token', bearerToken);
        window.location.href = "/admin-dashboard";
        // this.props.history.push('/admin-dashboard');
        navigate('/admin-dashboard');
      
      }).catch(error => {
        // this.setState({ errorMessage: error.message });
        // console.log(error);
        alert('Username or password do not match... !');
        // console.error('There was an error!', error);
    });
  };

  return (
      <>
      {/* <Routes>
        <Route path="/admin-dashboard" /> 
        <Route path="/testimonials" /> 
      </Routes>  */}
      <div className="form-screen">
            <a href="" className="spur-logo"><img src={Wedrise_logo} className="lgo" alt="logo" /> </a>
            <div className="card account-dialog">
                <div className="card-header login-header  text-white"> Please sign in </div>
                <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input type="email"  {...register("email", { required: true })} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                            {errors.email && <span className='form-error'>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" {...register("password", { required: true })} id="password" placeholder="Password"/>
                            {errors.password && <span className='form-error'>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            </div>
                        </div>
                        <div className="account-dialog-actions">
                            <button type="submit" className="btn btn-info">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </>
  );
}

export default Login;
