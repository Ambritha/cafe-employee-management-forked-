import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { addCafe, updateCafe } from "../../actions/cafeActions";

const CafeForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const cafe = useSelector((state) =>
    state.cafes.find((cafe) => cafe.id === id)
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Add other form fields and state as needed

  useEffect(() => {
    if (cafe) {
      setName(cafe.name);
      setDescription(cafe.description);
      // Set other form fields from cafe object
    }
  }, [cafe]);

  const onFinish = (e) => {
    e.preventDefault();
    const newCafe = {
      name,
      description,
      // Add other form fields
    };

    if (id) {
      // Update existing cafe
      dispatch(updateCafe(id, newCafe));
    } else {
      // Add new cafe
      dispatch(addCafe(newCafe));
    }

    history.push("/cafes");
  };

  return (
    <div className="form-container">
      <h2>Add/Edit Café</h2>
      <Form name="add-edit-cafe" onFinish={onFinish} className="form">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the name" },
            { min: 6, message: "Name must be at least 6 characters" },
            { max: 10, message: "Name cannot exceed 10 characters" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Logo" name="logo">
          <Input type="file" />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter the location" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="button-container">
            <Button type="primary" htmlType="submit" className="form-button">
              Submit
            </Button>
            <Button htmlType="button" className="form-button">
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export { CafeForm };
