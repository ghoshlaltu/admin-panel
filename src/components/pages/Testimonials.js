import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import {Button, Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useForm } from "react-hook-form";
import BASE_URL from '../../config';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Testimonials() {
    const apiUrl = BASE_URL;
    const SuccessNotify = (val) => toast.success('🦄 Success ! ' + val, {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          });
      const ErrorNotify = (val) => toast.error('Error ! '+ val, {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          });

    const [loading, setLoading] = useState(false);


    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    // const { register: register, handleSubmit: handleSubmit, watch: watch, reset:reset, formState: { errors: errors } } = useForm();
    const { register: registerEdit, handleSubmit: handleSubmitEdit, watch: editWatch, reset:editReset, formState: { errors: errorsEdit } } = useForm();

    const [myData, setData] = useState([]);
    const storedToken = localStorage.getItem('token');
    const token = 'Bearer '+storedToken;


    // add form pop up 
    const [isShow, invokeModal] = React.useState(false)
    const initModal = () => {
      return invokeModal(true);
    }
    const closeModal = () => {
      return invokeModal(false);
    }
    // add form pop up 

    


    // Edit form pop up 
    const [editIsShow, editModal] = React.useState(false)
    const [editApiData, setEditApiData] = useState(false);
    const editInitModal = async (value) => {
      // setEditApiData(false);
      // alert(value);
      axios.get(apiUrl+'api/testimonials-details/'+value, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then(response => {
          // setEditApiData(response.data.data[0]);
          const fetchedData = response.data.data[0];
          setEditApiData(fetchedData);
          editReset(fetchedData); // Reset the form values with the fetched data
          // console.log(response.data.data[0].name);
          return editModal(true);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
    
    const closeEditModal = () => {
      editReset();
      return editModal(false);
    }
    // Edit form pop up 

    
    const deleteClick = async (value) => {
      //alert(value);
      const shouldDelete = window.confirm("Are you sure you want to delete?");
      if (shouldDelete) {
        // Perform deletion logic here
        // alert(`Deleting ${value}...`);
        const article = { id: value };

        axios.post(apiUrl+'api/testimonials-details-delete', article, {
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

    // after add submit 
    const onSubmitAdd = async (data) => {
      const addFormData = {
          name: data.name,
          text: data.description
        };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(addFormData),
      };

      try {
        const response = await fetch(apiUrl+'api/testimonials-store', requestOptions);
        if (response.ok) {
          const responseData = await response.json();
         
          console.log(responseData.message); // Response data will be logged in the console
          SuccessNotify(responseData.message);
          reset(); 
          invokeModal(false);
          fetchData();
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    // after add submit 

    
    // after add submit 
    const onSubmitEdit = async (data) => {
      // editReset(); 
      //var formvalues = JSON.stringify(data);
      //console.log(JSON.parse(formvalues).edit_description);return false;
      const article = { id: data.edit_id, name: data.edit_name, text: data.edit_description, status: data.edit_status };

      axios.post(apiUrl+'api/testimonials-details-update', article, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .then(response => {
          // setEditApiData(response.data.data[0]);
          SuccessNotify(response.data.message);
          fetchData();
          return editModal(false);
        })
        .catch(error => {
          // console.log(error.response.data.data);
          // console.error('Error fetching data:', error);
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
        });
    };
    // after add submit 

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
        const response = await axios.post(apiUrl+'api/testimonials', data, {
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
    return (
      <>
      <Modal show={isShow}>
          <Modal.Header closeButton onClick={closeModal}>
            <Modal.Title>Add New Testimonials</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form onSubmit={handleSubmit(onSubmitAdd)}>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" {...register("name", { required: true })}/>
              {errors.name && <span className='form-error'>Name is required</span>}
              <br />
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Description" {...register("description", { required: true })} />
              {errors.description && <span className='form-error'>Testimonials Description is required</span>}
              <br />
              <div className='text-right'>
              <Button variant="success" type="submit">
                Add
              </Button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>



        <Modal show={editIsShow}>
          <Modal.Header closeButton onClick={closeEditModal}>
            <Modal.Title>Edit Testimonials {editApiData?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
              <Form.Label>Name </Form.Label>
              <Form.Control type="hidden"  {...registerEdit("edit_id", { required: true })} defaultValue={editApiData?.id} />
              <Form.Control type="text"  {...registerEdit("edit_name", { required: true })} defaultValue={editApiData?.name} />
              {errorsEdit.edit_name && <span className='form-error'>Name is required</span>}
              
              <br />
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}  {...registerEdit("edit_description", { required: true })} placeholder="Description" defaultValue={editApiData?.text}  />
              {errorsEdit.edit_description && <span className='form-error'>Testimonials Description is required</span>}
              <br />

              <Form.Label>Status</Form.Label>
              <select className='form-control' {...registerEdit("edit_status", { required: true })} defaultValue={editApiData?.status}>
                <option value="Enable">Enable</option>
                <option value="Disable">Disable</option>
              </select>
              {errorsEdit.edit_status && <span className="form-error">Status is required</span>}
              <br/>

              <div className='text-right'>
              <Button variant="success" type="submit" name="update" >
                Update
              </Button>
              </div>
            </form>
           

          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="danger" onClick={closeModal}>
              Close
            </Button> */}
          </Modal.Footer>
        </Modal>


        <main className="dash-content">
        <div className="container-fluid">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : "" }
            <div className="row">
              <div className="col-lg-6">
                <h1 className="dash-title">All Testimonials</h1>
                <ToastContainer position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"/>
              </div>
              <div className="col-lg-6 text-right">
                <Button variant="success" onClick={() => initModal()}>
                  Add <i className='fa fa-plus'></i>
                </Button>
              </div>
            </div>
          <div className="row">
            <div className="col-lg-12">


              <div className="card spur-card">
               
                <div className="card-body ">
                  <table className="table table-in-card">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Text</th>
                        <th scope="col">Status</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {myData.data ? (
                      // myData.data.map( (item, i) => <Item key={i} item={item} /> )
                      myData.data.map((item) => (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>{item.name}</td>
                          <td>{item.text}</td>
                          <td>{item.status}</td>
                          <td> <Button variant="info btn-sm" onClick={() => editInitModal(item.id)} > <i className='fa fa-edit'></i></Button></td>
                        <td><Button variant="danger btn-sm" onClick={() => deleteClick(item.id) }> <i className='fa fa-trash'></i></Button></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">Loading...</td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
          </div>
        
        </div>
      </main>
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
  
export default Testimonials;