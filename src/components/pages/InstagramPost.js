import React, { useState, useEffect } from 'react';
import { MDBDataTable, MDBInput } from 'mdbreact';
import {Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';
import { useForm } from "react-hook-form";
import BASE_URL from '../../config';


const InstagramPost = () => {
  const apiUrl = BASE_URL;

  const [loading, setLoading] = useState(false);
  const [myData, setData] = useState([]);
  const storedToken = localStorage.getItem('token');
  const token = 'Bearer '+storedToken;


  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  // const { register: register, handleSubmit: handleSubmit, watch: watch, reset:reset, formState: { errors: errors } } = useForm();
  const { register: registerEdit, handleSubmit: handleSubmitEdit, watch: editWatch, reset:editReset, formState: { errors: errorsEdit } } = useForm();
 //call all data
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
    const response = await axios.post(apiUrl+'api/instagram-posts', data, {
      headers: {
        Authorization: token
      }
    });
    setData(response.data);
    setLoading(false); 
  } catch (error) {
    console.error(error);
  }
};
//call all data
  // console.log(myData);
 

  const columns = [
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Description',
      field: 'description',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Image',
      field: 'image',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Actions',
      field: 'actions',
      width: 100
    }
  ];


     // add form pop up 
     const [isShow, addPopUpModal] = React.useState(false)
     const addModal = () => {
       return addPopUpModal(true);
     }
     const closeModal = () => {
       return addPopUpModal(false);
     }

     
    // after add submit 
    const onSubmitAdd = async (data) => {
      setLoading(true);

      const formData = new FormData();
      // Append the file to the FormData object
      formData.append('file', data.file[0]);

      // Append other form data fields
      formData.append('name', data.name);
      formData.append('text', data.description);
   
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      };

      try {
        const response = await fetch(apiUrl+'api/instagram-post-store', requestOptions);
        if (response.ok) {
          const responseData = await response.json();
         
          console.log(responseData.message); // Response data will be logged in the console
          // SuccessNotify(responseData.message);
          setLoading(false);
          reset(); 
          addPopUpModal(false);
          fetchData();
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    // after add submit 
    // add form pop up 


    // edit click
    const [editApiData, setEditApiData] = useState(false);
    const handleEdit = async (rowId) => {

      axios.get(apiUrl+'api/instagram-post-details/'+rowId, {
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
    console.log(editApiData);
    // edit click 
    // after edit submit 
    const onSubmitEdit = async (data) => {
      setLoading(true);

      const formData = new FormData();
      // Append the file to the FormData object

      // console.log(data.file);return false;
      if(data.file){
        formData.append('file', data.file[0]);
      }
      // 

      // Append other form data fields
      formData.append('id', data.id);
      formData.append('name', data.name);
      formData.append('text', data.description);
      formData.append('status', data.status);
   
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      };

      try {
        const response = await fetch(apiUrl+'api/instagram-post-details-update', requestOptions);
        if (response.ok) {
          const responseData = await response.json();
         
          // SuccessNotify(response.data.message);
          fetchData();
          return editModal(false);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        // console.error('Error:', error);
        if (error.response && error.response.data && error.response.data.data) {
          const errorData = error.response.data.data;
          return Object.keys(errorData).map((key) => {
            if (Array.isArray(errorData[key])) {
              // return errorData[key].map((errorMsg, index) => (
              //   ErrorNotify(errorMsg)
              // ));
            }
          });
          return null;
        };
      }
    };
    // after edit submit 
    
    const handleDelete = (rowId) => {
      // Handle delete functionality for the row with the given rowId
      console.log('Delete row:', rowId);
    };

    const [editIsShow, editModal] = React.useState(false)

    const closeEditModal = () => {
      editReset();
      return editModal(false);
    }
    // edit 

  return (
    <>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Add New Instagram Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form  onSubmit={handleSubmit(onSubmitAdd)}>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" {...register("name", { required: true })}/>
            {errors.name && <span className='form-error'>Name is required</span>}
            <br />
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Description" {...register("description", { required: true })} />
            {errors.description && <span className='form-error'>Testimonials Description is required</span>}
            <br />
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" placeholder="Name" {...register("file", { required: true })}/>
            {errors.file && <span className='form-error'>Image is required</span>}
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
            <Modal.Title>Edit Instagram Post </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmitEdit(onSubmitEdit)}>

          <input type="hidden" className="form-control" {...registerEdit("id", { required: true })} defaultValue={editApiData?.id} />
            <div className="form-group row">
              <label for="staticEmail" className="col-sm-3 col-form-label">Name: </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" {...registerEdit("name", { required: true })} defaultValue={editApiData?.name} />
                {errorsEdit.name && <span className='form-error'>Name is required</span>}
              </div>
            </div>
            <div className="form-group row">
              <label for="inputPassword" className="col-sm-3 col-form-label">Description: </label>
              <div className="col-sm-9">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" {...registerEdit("description", { required: true })} defaultValue={editApiData?.text}></textarea>
                {errorsEdit.description && <span className='form-error'>Testimonials Description is required</span>}
              </div>
            </div>

            <div className="form-group row">
              <label for="inputPassword" className="col-sm-3 col-form-label">File: </label>
              <div className="col-sm-6">
                 <input type="file" className="form-control"  {...registerEdit("file")}/>
              </div>
              <div className="col-sm-3">
                <a href={apiUrl+ editApiData?.image} target='_blanlk'>
                 <img src={apiUrl+ editApiData?.image} alt='IMG' height="50px"></img>
                 </a>
              </div>
            </div>
            
            <div className="form-group row">
              <label for="inputPassword" className="col-sm-3 col-form-label">Status: </label>
              <div className="col-sm-9">
                <select class="form-control" {...registerEdit("status", { required: true })} defaultValue={editApiData?.status}>
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
            </div>

            <hr></hr>
            <div className="form-group row">
              {/* <label for="inputPassword" className="col-sm-3 col-form-label">Action: </label> */}
              <div className="col-sm-12 text-center">
                <Button variant="success" className=' w-100' type="submit" name="update" >
                  Update
                </Button>
              </div>
            </div>

          </form>
           

          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="danger" onClick={closeModal}>
              Close
            </Button> */}
          </Modal.Footer>
        </Modal>

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
                <h1 className="dash-title">All Instagram Posts</h1>
               
              </div>
              <div className="col-lg-6 text-right">
                <Button variant="success" onClick={() => addModal()}>
                  Add <i className='fa fa-plus'></i>
                </Button>
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
                        rows: myData.data ? myData.data.map((item) => ({
                          name: item.name,
                          description: item.text,
                          image: <img src={BASE_URL+item.image} alt="Image" height="25px" />,
                          status: item.status,
                          actions: (
                            <>
                            <Button variant="info btn-sm" onClick={() => handleEdit(item.id)} > <i className='fa fa-edit'></i></Button>
                            &nbsp; &nbsp; 
                            <Button variant="danger btn-sm" onClick={() => handleDelete(item.id) }> <i className='fa fa-trash'></i></Button>
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

export default InstagramPost;