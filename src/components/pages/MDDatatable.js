import React from 'react';
import { MDBDataTable } from 'mdbreact';

const MDDatatable = () => {

  
  const handleEdit = (rowId) => {
    // Handle edit functionality for the row with the given rowId
    console.log('Edit row:', rowId);
  };

  const handleDelete = (rowId) => {
    // Handle delete functionality for the row with the given rowId
    console.log('Delete row:', rowId);
  };

  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Position',
        field: 'position',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Office',
        field: 'office',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Age',
        field: 'age',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Start date',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Salary',
        field: 'salary',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Actions',
        field: 'actions',
        width: 100
      }
    ],
    rows: [
     
      {
        name: 'Doris Wilder',
        position: 'Sales Assistant',
        office: 'Sidney',
        age: '23',
        date: '2010/09/20',
        salary: '$85',
        actions: (
          <>
            <button onClick={() => handleEdit(1)}>Edit</button>
            <button onClick={() => handleDelete(1)}>Delete</button>
          </>
        )
      },
      {
        name: 'Angelica Ramos',
        position: 'Chief Executive Officer (CEO)',
        office: 'London',
        age: '47',
        date: '2009/10/09',
        salary: '$1'
      },
      {
        name: 'Donna Snider',
        position: 'Customer Support',
        office: 'New York',
        age: '27',
        date: '2011/01/25',
        salary: '$112'
      }
    ]
  };

  return (
    <>
    <main className="dash-content">
    <div className="container-fluid">
      <div className="row dash-row">
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    /> 
    </div>
    </div>
  </main>
  </>
  );
}

export default MDDatatable;