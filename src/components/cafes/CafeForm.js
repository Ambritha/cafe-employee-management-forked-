import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { addCafe, updateCafe } from "../../actions/cafeActions";

const CafeForm = () => {
  const { Title } = Typography;

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      logo,
      location,
    };

    if (id) {
      // Update existing cafe
      dispatch(updateCafe(id, newCafe));
    } else {
      // Add new cafe
      dispatch(addCafe(newCafe));
    }

    navigate("/cafes");
  };
  const handleFormCancel = () => {
    navigate("/cafes");
  };
  return (
    <div className="form-container">
      <Title>Add/Edit Cafe</Title>
      <Form
        name="add-edit-cafe"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
        className="form"
      >
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
            <Button
              htmlType="button"
              className="form-button"
              onClick={handleFormCancel}
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export { CafeForm };
