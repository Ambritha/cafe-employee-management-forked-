import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { Button } from "antd";
import { fetchCafes } from "../../actions/cafeActions";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
const CafeList = () => {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes);

  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);
  function MyRenderer(params) {
    return (
      <span className="my-renderer">
        <button> Edit</button>
        <button> Delete</button>
      </span>
    );
  }
  const columnDefs = [
    { headerName: "Logo", field: "logo" },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Employees", field: "employees" },
    { headerName: "Location", field: "location" },
    {
      headerName: "Actions",
      field: "id",
      editable: false,
      cellRenderer: MyRenderer,
    },
  ];
  const rowDefs = [
    { headerName: "Logo", field: "logo" },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Employees", field: "employees" },
    { headerName: "Location", field: "location" },
  ];

  const handleDelete = (id) => {
    // Implement delete functionality
  };

  return (
    <div>
      <h1>Cafes</h1>
      <Button type="primary">
        <Link to="/cafes/add">Add New Cafe</Link>
      </Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact columnDefs={columnDefs} rowData={rowDefs}></AgGridReact>
      </div>
    </div>
  );
};

export { CafeList };
