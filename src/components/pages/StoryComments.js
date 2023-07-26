import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import {Button, Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useForm } from "react-hook-form";
import BASE_URL from '../../config';

import { MDBDataTable, MDBInput } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StoryComments() {
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

    const [myData, setData] = useState([]);
    const storedToken = localStorage.getItem('token');
    const token = 'Bearer '+storedToken;

    
    const deleteClick = async (value) => {
      //alert(value);
      const shouldDelete = window.confirm("Are you sure you want to delete?");
      if (shouldDelete) {
        // Perform deletion logic here
        // alert(`Deleting ${value}...`);
        const article = { id: value };

        axios.post(apiUrl+'api/site-info-get-story-messages-delete', article, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
          .then(response => {
            SuccessNotify(response.data.message);
            fetchData();
          })
          .catch(error => {
            // console.error('Error fetching data:', error);
            ErrorNotify(error.response.data.data)
          });
      }
    }

   

    //call all testimonials data
    useEffect(() => {
      //console.log(data);
      fetchData();
    }, []);

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = {
          // Add your request payload here
        };
        const response = await axios.post(apiUrl+'api/site-info-get-story-messages', data, {
          headers: {
            Authorization: token
          }
        });
        setData(response.data);
        SuccessNotify(response.data.message);
        setLoading(false); 
      } catch (error) {
        console.error(error);
      }
    };
    //call all testimonials data  
    //console.log(data.data);

    // console.log(editApiData.name);

    
  const columns = [
    
    {
      label: 'SN',
      field: 'id',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Story Name',
      field: 'StoryName',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Comments',
      field: 'Comments',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Actions',
      field: 'actions',
      width: 100
    }
  ];


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
                <div className="row">
                <div className="col-lg-6">
                  <h1 className="dash-title">All Story Comments Posts</h1>
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
                </div>
                <div className="col-lg-6 text-right">
                 
                </div>
              </div>
                  <div className="row dash-row">
                    <MDBDataTable
                      striped
                      bordered
                      small
                      // data={data}
                      data={{
                        columns: columns,
                        rows: myData.data ? myData.data.map((item, i) => ({
                          id: i+1,
                          StoryName: item.storie.name,
                          name: item.name,
                          Comments: item.comments,
                          actions: (
                            <>
                            <Button variant="danger btn-sm" onClick={() => deleteClick(item.id) }> <i className='fa fa-trash'></i></Button>
                            </>
                          )
                        })) : []
                      }}
                    /> 
                  </div>
              </div>
          </main> 
      )}
      </>
    );
  }

  
function Item(props)
{
   // console.log(props);
    return (
      <></>
      // <tr key={props.item.id}>
      //   <th scope="row">{props.item.id}</th>
      //   <td>{props.item.name}</td>
      //   <td>{props.item.text}</td>
      //   <td>{props.item.status}</td>
      //   <td> <Button variant="info btn-sm" onClick={initModal} > <i className='fa fa-edit'></i></Button></td>
      //   <td><Button variant="danger btn-sm" > <i className='fa fa-trash'></i></Button></td>
      // </tr>
    )
}
  
export default StoryComments;