import { Form, Input, Button, DatePicker } from "antd";
import { useAppDispatch } from "../hooks";
import { submitCustomer } from "../store/customer.slice";
import { SubmitCustomer } from "../types/customer.types";
import { useEffect } from "react";

const FormComponent = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish = (data: SubmitCustomer) => {
    dispatch(
      submitCustomer(
        {
          ...data,
          installmentAmount: Number(data.installmentAmount),
        },
        () => {
          console.warn("reset: ");
          form.resetFields();
        }
      )
    );
  };

  useEffect(() => {
    form.setFieldsValue({ installmentFrequency: "Monthly" });
  }, [form]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "40%" }}>
        <h1>Customer Form</h1>
        <Form
          form={form}
          initialValues={{ installmentFrequency: "Monthly" }}
          name="customer_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Customer Name"
            name="name"
            rules={[{ required: true, message: "Please input Customer Name." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Customer CNIC"
            name="CNIC"
            rules={[
              { required: true, message: "Please input Customer CNIC." },
              {
                pattern: /^\d{13}$/,
                message: "CNIC must be exactly 13 digits.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Customer AKBL Account No."
            name="accountNo"
            rules={[
              {
                required: true,
                message: "Please input Customer AKBL Account No.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Installment Amount"
            name="installmentAmount"
            rules={[
              { required: true, message: "Please input Installment Amount." },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Form Date"
            name="fromDate"
            rules={[{ required: true, message: "Please select Form Date." }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="To Date"
            name="toDate"
            rules={[{ required: true, message: "Please select To Date." }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Installment Frequency"
            name="installmentFrequency"
            rules={[
              {
                required: true,
                message: "Please input Installment Frequency.",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormComponent;
