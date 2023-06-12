import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, updateEmployee } from "../../actions/employeeActions";
import { Form, Input, Button, Radio, Select, Typography } from "antd";
const { Option } = Select;
const { Title } = Typography;
const EmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [assignedCafe, setAssignedCafe] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const cafes = useSelector((state) => state.cafes);

  const onFinish = (values) => {
    if (isEditing) {
      dispatch(updateEmployee(name, email, phone, gender, assignedCafe));
    } else {
      dispatch(addEmployee(values));
    }
    navigate("/employees");
  };
  const onCancel = () => {
    navigate("/employees");
  };
  const cafeOptions = cafes.map((cafe) => (
    <Option key={cafe.id} value={cafe.id}>
      {cafe.name}
    </Option>
  ));
  const initialValues = isEditing
    ? {
        name: employee.name,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        gender: employee.gender,
        cafeId: employee.cafeId,
      }
    : {};
  return (
    <div className="form-container">
      <Title>{id ? "Edit Employee" : "Add New Employee"}</Title>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        initialValues={initialValues}
        className="form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "100%" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the name" },
            { min: 6, message: "Name must be at least 6 characters" },
            { max: 10, message: "Name must not exceed 10 characters" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter the email address" },
            { type: "email", message: "Invalid email address" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter the phone number" },
            {
              pattern: /^[89]\d{7}$/,
              message:
                "Invalid phone number. Must start with 8 or 9 and have 8 digits",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select the gender" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Assigned Café" name="cafeId">
          <Select placeholder="Select café">{cafeOptions}</Select>
        </Form.Item>
        <Form.Item>
          <Button className="form-button" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button className="form-button" onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { EmployeeForm };
