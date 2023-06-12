import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { Button, Typography } from "antd";
import { fetchCafes } from "../../actions/cafeActions";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CafeList = () => {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes);
  const navigate = useNavigate();
  const [selectedCafeId, setSelectedCafeId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { Title, Text } = Typography;

  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);
  function roweditRenderer(params) {
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
    { headerName: "Logo", field: "logo" },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Employees", field: "employees" },
    { headerName: "Location", field: "location" },
    {
      headerName: "Actions",
      field: "id",
      editable: false,
      width: "200",
      cellRenderer: roweditRenderer,
    },
  ];
  const rowDefs = [
    { headerName: "Logo", field: "logo" },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Employees", field: "employees" },
    { headerName: "Location", field: "location" },
  ];
  const handleCafeClick = (cafeId) => {
    navigate(`/employees/${cafeId}/`);
  };
  const handleEdit = (cafeId) => {
    navigate(`/cafes/${cafeId}/edit`);
  };

  const confirmDelete = (cafeId) => {
    setSelectedCafeId(cafeId);
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    dispatch(deleteCafe(selectedCafeId));
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setSelectedCafeId(null);
    setShowConfirmation(false);
  };

  return (
    <div>
      <Title>Cafes</Title>
      <Button type="primary" className="add-cafe">
        <Link to="/cafes/add">Add New Cafe</Link>
      </Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowDefs}
          onRowClicked={(row) => handleCafeClick(row.data.id)}
        ></AgGridReact>
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

export { CafeList };
