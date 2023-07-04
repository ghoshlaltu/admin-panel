import React from 'react';

import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
function ProductPage() {
    return (
      <>
      
        <main className="dash-content">
        <div className="container-fluid">
          <h1 className="dash-title">Product</h1>
          <div className="row">
            <div className="col-lg-12">
              <div className="card spur-card">
                <div className="card-header">
                  <div className="spur-card-icon">
                    <i className="fas fa-table" />
                  </div>
                  <div className="spur-card-title">Products</div>
                </div>
                <div className="card-body ">
                  <table className="table table-in-card">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
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
  
  export default ProductPage;