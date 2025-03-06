// import { useState } from "react";
import { Form, Input, Button } from "antd";
// import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { login } from "../store/auth.slice";

interface FormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();

  const onFinish = (data: FormInputs) => {
    dispatch(login({ ...data, email: data.email.trim().toLowerCase() }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "300px" }}>
        <h1>Login</h1>
        <Form name="login_form" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter password!" },
              { min: 6, message: "Password must be at least 6 characters." },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
