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
  const [myData, setData] = useState([]);
  const storedToken = localStorage.getItem('token');
  const token = 'Bearer '+storedToken;


  
  const { register, handleSubmit, watch, reset, formState: { errors }, setValue } = useForm();
  //const [editorData, setEditorData] = useState(""); 
  // const { register: register, handleSubmit: handleSubmit, watch: watch, reset:reset, formState: { errors: errors } } = useForm();
  const { register: registerEdit, handleSubmit: handleSubmitEdit, watch: editWatch, reset:editReset, formState: { errors: errorsEdit }, setValue:setValueE } = useForm();
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
    const response = await axios.post(apiUrl+'api/faqs', data, {
      headers: {
        Authorization: token
      }
    });
    setData(response.data);
    // SuccessNotify(response.data.message);
    setLoading(false); 
  } catch (error) {
    console.error(error);
  }
};
//call all data
  // console.log(myData);
 

  const columns = [
    {
      label: 'Showing Place',
      field: 'show_side',
      sort: 'asc',
      width: 150
    },
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

    
     const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      //setEditorData(data); // Update the state variable with the CKEditor value
      setValue('description', data);
    };
    
  
    // after add submit 
    const onSubmitAdd = async (data) => {
      //console.log(data.description);return false;
      setLoading(true);

      const formData = new FormData();
      // Append other form data fields
      formData.append('cat', data.cat);
      formData.append('title', data.title);
      formData.append('text', data.description);
   
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      };

      try {
        const response = await fetch(apiUrl+'api/faq-store', requestOptions);
        if (response.ok) {
          const responseData = await response.json();
         
          //console.log(responseData.message); // Response data will be logged in the console
          SuccessNotify(responseData.message);
          setLoading(false);
          reset(); 
          addPopUpModal(false);
          fetchData();
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
    // after add submit 
    // add form pop up 


    // edit click
    const [editIsShow, editModal] = React.useState(false)
    const [editApiData, setEditApiData] = useState(false);
    const handleEdit = async (rowId) => {
      setLoading(true);
      axios.get(apiUrl+'api/faq-details/'+rowId, {
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
          // setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
    //console.log(editApiData);
    // edit click 
    // after edit submit 
      
    const handleEditorChangeE = (event, editor) => {
      const data = editor.getData();
      //setEditorData(data); // Update the state variable with the CKEditor value
      setValueE('description', data);
    };

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
      formData.append('title', data.title);
      formData.append('text', data.description);
      formData.append('cat', data.cat);
      formData.append('status', data.status);
   
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      };

      try {
        const response = await fetch(apiUrl+'api/faq-details-update', requestOptions);
        if (response.ok) {
          const responseData = await response.json();
          //console.log(responseData.message);
          closeEditModal();
          setLoading(false);
          fetchData();
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
    
    const closeEditModal = () => {
      setLoading(false);
      editReset();
      return editModal(false);
    }
    // edit 

    // delete 
    const handleDelete = async (rowId) => {
      setLoading(true);
      // Handle delete functionality for the row with the given rowId
      //console.log('Delete row:', rowId);
      const shouldDelete = window.confirm("Are you sure you want to delete?");
      if (shouldDelete) {
        // Perform deletion logic here
        // alert(`Deleting ${value}...`);
        const article = { id: rowId };

        axios.post(apiUrl+'api/instagram-post-delete', article, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
          .then(response => {
            SuccessNotify(response.data.message);
            fetchData();
            setLoading(false);
          })
          .catch(error => {
            // console.error('Error fetching data:', error);
            ErrorNotify(error.response.data.data)
          });
      }else{
        fetchData();
      }
    };
    // delete 
  //console.log(editorData);
  return (
    <>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Add New Faq Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form  onSubmit={handleSubmit(onSubmitAdd)}>
            
            <Form.Label>Showing Place</Form.Label>
            <select class="form-control" {...register("cat", { required: true })} >
              <option value="">Select</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
            {errors.cat && <span className='form-error'>Showing Place is required</span>}
            <br />

            <Form.Label>Title Name</Form.Label>
            <Form.Control type="text" placeholder="Name" {...register("title", { required: true })}/>
            {errors.title && <span className='form-error'>Title Name is required</span>}
            <br />
            <Form.Label>Description</Form.Label>
            {/* <Form.Control as="textarea" rows={3} placeholder="Description" {...register("description", { required: true })} /> */}
            <CKEditor
            {...register("description", { required: true })}
            editor={ClassicEditor}
            data=""
            onReady={(editor) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={handleEditorChange} // Update the state variable when the CKEditor value changes
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
            {errors.description && <span className='form-error'> Description is required</span>}
           
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
            <Modal.Title>Edit Faq Post </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmitEdit(onSubmitEdit)}>

          <input type="hidden" className="form-control" {...registerEdit("id", { required: true })} defaultValue={editApiData?.id} />
           <div className="form-group row">
              <label for="staticEmail" className="col-sm-3 col-form-label">Name: </label>
              <div className="col-sm-9">
                <select class="form-control" {...registerEdit("cat", { required: true })}  defaultValue={editApiData?.cat}>
                  <option value="">Select</option>
                  <option value="Left">Left</option>
                  <option value="Right">Right</option>
                </select>
                {errorsEdit.name && <span className='form-error'>Showing Place is required</span>}
              </div>
            </div>

            <div className="form-group row">
              <label for="staticEmail" className="col-sm-3 col-form-label">Title Name: </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" {...registerEdit("title", { required: true })} defaultValue={editApiData?.name} />
                {errorsEdit.title && <span className='form-error'>Title Name is required</span>}
              </div>
            </div>
            <div className="form-group row">
              <label for="inputPassword" className="col-sm-3 col-form-label">Description: </label>
              <div className="col-sm-9">
                {/* <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" {...registerEdit("description", { required: true })} defaultValue={editApiData?.text}></textarea> */}
                <CKEditor
                  {...registerEdit('description', { required: true })}
                  editor={ClassicEditor}
                  data={editApiData?.text} // Set the initial CKEditor value
                  onReady={(editor) => {
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={handleEditorChangeE}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
                {errorsEdit.description && <span className='form-error'> Description is required</span>}
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
                <h1 className="dash-title">All Faqs Posts</h1>
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
                          show_side: item.cat,
                          name: item.title,
                          description: item.text,
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

export default Faq;