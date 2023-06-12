import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchEmployees, deleteEmployee } from "../../actions/employeeActions";
import { AgGridReact } from "ag-grid-react";
import { Button, Typography } from "antd";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees);
  const [selectedEmployeeId, setSelectedEmplpyeeId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { Title, Text } = Typography;
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  function empRowEditRenderer(params) {
    return (
      <span className="button-renderer">
        <Button onClick={() => handleEdit(params.data.id)}> Edit</Button>
        <Button
          type="primary"
          onClick={() => confirmDelete(params.data.id)}
          danger
        >
          Delete
        </Button>
      </span>
    );
  }

  const columnDefs = [
    { headerName: "Employee ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email Address", field: "email" },
    { headerName: "Phone Number", field: "phone" },
    { headerName: "Days Worked", field: "daysWorked" },
    { headerName: "Café Name", field: "cafeName" },
    {
      headerName: "Actions",
      field: "id",
      editable: false,
      cellRenderer: empRowEditRenderer,
    },
  ];
  const rowDefs = [
    { headerName: "Logo", field: "logo" },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Employees", field: "employees" },
    { headerName: "Location", field: "location" },
  ];
  const handleEdit = (empId) => {
    navigate(`/employees/${empId}/edit`);
  };

  const confirmDelete = (empId) => {
    setSelectedEmplpyeeId(empId);
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(selectedEmployeeId));
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setSelectedEmplpyeeId(null);
    setShowConfirmation(false);
  };
  return (
    <div>
      <Title>List of Employees</Title>
      <Button type="primary" className="add-cafe">
        <Link to="/employees/add">Add New Employee</Link>
      </Button>

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact columnDefs={columnDefs} rowData={rowDefs} />
      </div>
      {showConfirmation && (
        <div className="delete-confirmation">
          <Text>Are you sure you want to delete this cafe?</Text>
          <Button type="primary" size="small" onClick={handleDelete}>
            Yes
          </Button>
          <Button type="default" size="small" onClick={cancelDelete}>
            No
          </Button>
        </div>
      )}
    </div>
  );
};

export { EmployeeList };
