import React, { useState, useEffect } from 'react';
import { MDBDataTable, MDBInput } from 'mdbreact';
import {Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';
import { useForm } from "react-hook-form";
import BASE_URL from '../../config';
import { ToastContainer, toast } from 'react-toastify';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Faq = () => {
  const apiUrl = BASE_URL;
  const SuccessNotify = (val) => toast.success('🦄 Success ! ' + val, {
                                  position: "top-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "colored",
                                  });
const ErrorNotify = (val) => toast.error('Error ! '+ val, {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                              });

const [loading, setLoading] = useState(false);
const [myData, setData] = useState(false);
const storedToken = localStorage.getItem('token');
const token = 'Bearer ' + storedToken;

const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();

// Fetch data when component mounts
useEffect(() => {
    fetchData(1);
}, []);

useEffect(() => {
    if (myData) {
      Object.keys(myData).forEach((key) => {
        setValue(key, myData[key]);
      });
    }
  }, [myData, setData]);


const fetchData = async (rowId) => {
    setLoading(true);
    try {
        const response = await axios.get(apiUrl + 'api/site-info-details/' + rowId, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        });
        const fetchedData = response.data.data[0];
        setData(fetchedData);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
    }
};
//call all data
const onSubmitEdit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    // Append the file to the FormData object

    // console.log(data.file);return false;
    if(data.logo){
      formData.append('logo', data.logo[0]);
    }
    if(data.fav){
        formData.append('fav', data.fav[0]);
    }
    if(data.img1){
        formData.append('img1', data.img1[0]);
    }
    if(data.img2){
        formData.append('img2', data.img2[0]);
    }
    if(data.vid1){
        formData.append('vid1', data.vid1[0]);
    }
    if(data.vid2){
        formData.append('vid2', data.vid2[0]);
    }
    if(data.vid3){
        formData.append('vid3', data.vid3[0]);
    }
    // 

    // Append other form data fields
    formData.append('id', data.id);
    formData.append('site', data.site);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('instagram', data.instagram);

    formData.append('text1', data.text1);
    formData.append('text2', data.text2);
    formData.append('text3', data.text3);
    formData.append('text4', data.text4);

    formData.append('text5', data.text5);
    formData.append('text5', data.text5);

    formData.append('mt1', data.mt1);
    formData.append('md1', data.md1);
    formData.append('mc1', data.mc1);
    
    formData.append('mt2', data.mt2);
    formData.append('md2', data.md2);
    formData.append('mc2', data.mc2);
    
    formData.append('mt3', data.mt3);
    formData.append('md3', data.md3);
    formData.append('mc3', data.mc3);
    
    formData.append('mt4', data.mt4);
    formData.append('md4', data.md4);
    formData.append('mc4', data.mc4);

 
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    };

    try {
      const response = await fetch(apiUrl+'api/site-info-details-update', requestOptions);
      if (response.ok) {
        const responseData = await response.json();
        //console.log(responseData.message);
        setLoading(false);
        SuccessNotify(responseData.message);
        // closeEditModal();
       
        // SuccessNotify(response.data.message);
        // fetchData();
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      // console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.data) {
        const errorData = error.response.data.data;
        return Object.keys(errorData).map((key) => {
          if (Array.isArray(errorData[key])) {
            return errorData[key].map((errorMsg, index) => (
              ErrorNotify(errorMsg)
            ));
          }
        });
        return null;
      };
    }
  };
  // after edit submit 

//   console.log(myData.site);
 //console.log('myData:', myData);
  return (
    <>
    {loading ? (
          <div className="row">
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
      </div>
        ) : (
        <main className="dash-content">
            <div className="container-fluid">
                <h1 className="dash-title text-center">Site Info</h1>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    />
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card spur-card">
                            <div className="card-body ">
                                <form onSubmit={handleSubmit(onSubmitEdit)}>
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Site Name {myData?.Site}</label>
                                        <div className="col-sm-10">
                                            <input  type="text" className="form-control" {...register('site', { required: true })}  placeholder="Site Name" defaultValue={myData?.site}  />
                                            {errors.site && <span className='form-error'>Name is required</span>}
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Email </label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" {...register('email', { required: true })} id="email" placeholder="Email" defaultValue={myData?.email} />
                                            {errors.email && <span className='form-error'>Site Email is required</span>}
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Phone </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('phone', { required: true })} id="phone" placeholder="Phone" defaultValue={myData?.phone}/>
                                            {errors.phone && <span className='form-error'>Site Phone is required</span>}
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Instagram Link</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('instagram', { required: true })} id="instagram" placeholder="Instagram Link" defaultValue={myData?.instagram}/>
                                            {errors.instagram && <span className='form-error'>Site instagram is required</span>}
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Logo</label>
                                        <div className="col-sm-5">
                                            <input type="file" className="form-control"  {...register('logo')} id="instagram" />
                                        </div>
                                        <div className="col-sm-5">
                                            
                                            <img src={BASE_URL+myData.logo} alt="Logo" height="25px" />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Favicon</label>
                                        <div className="col-sm-5">
                                            <input type="file" className="form-control" id="favicon" {...register('fav')} />
                                        </div>
                                        <div className="col-sm-5">
                                            <img src={BASE_URL+myData.fav} alt="Favicon" height="25px" />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Home Page Image </label>
                                        <div className="col-sm-5">
                                            <input type="file" className="form-control" id="img1"  {...register('img1')} />
                                        </div>
                                        <div className="col-sm-5">
                                            <img src={BASE_URL+myData.img1} alt="Hello There" height="25px" />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Contact Page Image </label>
                                        <div className="col-sm-5">
                                            <input type="file" className="form-control" id="img1"  {...register('img2')} />
                                        </div>
                                        <div className="col-sm-5">
                                            <img src={BASE_URL+myData.img2} alt="Get In Touch" height="25px" />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Home Page Video 1</label>
                                        <div className="col-sm-5">
                                            <input type="file" className="form-control" id="vid1"  {...register('vid1')} />
                                        </div>
                                        <div className="col-sm-5">
                                            <a href={BASE_URL+myData.vid1} target='_blank'>Link</a>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> HOme Page Video 2 </label>
                                        <div className="col-sm-5">
                                            <input type="file" className="form-control" id="vid2" {...register('vid2')}  />
                                        </div>
                                        <div className="col-sm-5">
                                            <a href={BASE_URL+myData.vid2} target='_blank'>Link</a>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Film Page Video </label>
                                        <div className="col-sm-5">
                                            <input type="file" className="form-control" id="vid3" {...register('vid3')}  />
                                        </div>
                                        <div className="col-sm-5">
                                            <a href={BASE_URL+myData.vid3} target='_blank'>Link</a>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Contact Page Text</label>
                                        <div className="col-sm-10">
                                            <textarea class="form-control" {...register('text1', { required: true })} rows="3" defaultValue={myData?.text1}></textarea>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Page Title 1 </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('text2', { required: true })} id="text2" placeholder="Page Title 1" defaultValue={myData?.text2} />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Page Title 2 </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('text3', { required: true })} id="text3" placeholder="Page Title 2" defaultValue={myData?.text3}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Page Title 3 </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('text4', { required: true })} id="text4" placeholder="Page Title 3" defaultValue={myData?.text4}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Page Title 4 </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('text5', { required: true })} id="text5" placeholder="Page Title 4" defaultValue={myData?.text5}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Page Title 5 </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('text6', { required: true })} id="text6" placeholder="Page Title 5" defaultValue={myData?.text6}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Home Page Meta Ttile </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('mt1', { required: true })} id="mt1" placeholder="Home Page Meta Ttile" defaultValue={myData?.mt1}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Home Page Meta Description </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('md1', { required: true })} id="md1" placeholder="Home Page Meta Description" defaultValue={myData?.md1}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Home Page Meta Content </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('mc1', { required: true })} id="mc1" placeholder="Home Page Meta Content" defaultValue={myData?.mc1}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Story Page Meta Ttile </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('mt2', { required: true })} id="mt2" placeholder="Story Page Meta Ttile" defaultValue={myData?.mt2}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Story Page Meta Description </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('md2', { required: true })} id="md2" placeholder="Story Page Meta Description" defaultValue={myData?.md2}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Story Page Meta Content </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('mc2', { required: true })} id="mc2" placeholder="Story Page Meta Content" defaultValue={myData?.mc2}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Film Page Meta Ttile </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('mt3', { required: true })} id="mt3" placeholder="Film Page Meta Ttile" defaultValue={myData?.mt3}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Film Page Meta Description </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('md3', { required: true })} id="md3" placeholder="Film Page Meta Description" defaultValue={myData?.md3}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Film Page Meta Content </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('mc3', { required: true })} id="mc3" placeholder="Contact Page Meta Content" defaultValue={myData?.mc3}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Contact Page Meta Ttile </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('mt4', { required: true })} id="mt4" placeholder="Contact Page Meta Ttile" defaultValue={myData?.mt4}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Contact Page Meta Description </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('md4', { required: true })} id="md4" placeholder="Contact Page Meta Description" defaultValue={myData?.md4}/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label  htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Contact Page Meta Content </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" {...register('mc4', { required: true })} id="mc4" placeholder="Film Page Meta Content" defaultValue={myData?.mc4}/>
                                        </div>
                                    </div>

                                    <hr></hr>
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <button type="submit" className="btn btn-primary w-100">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
        </main>
        )}
    </>
       
  );
}

export default Faq;