import { Form, Input, Button, DatePicker } from "antd";
import { useAppDispatch } from "../hooks";
import { submitCustomer } from "../store/customer.slice";
import { GetCustomer, SubmitCustomer } from "../types/customer.types";
import { useEffect, useState } from "react";
import { AllCustomer } from ".";
import moment from "moment";

const FormComponent = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const [idToEdit, setIdToEdit] = useState<GetCustomer | undefined>();

  const onFinish = (data: SubmitCustomer) => {
    if (!idToEdit) {
      dispatch(
        submitCustomer(
          {
            ...data,
            installmentAmount: Number(data.installmentAmount),
          },
          () => {
            form.resetFields();
            setIdToEdit(undefined);
          }
        )
      );
    } else {
      dispatch(
        submitCustomer(
          {
            ...data,
            _id: idToEdit._id,
            installmentAmount: Number(data.installmentAmount),
          },
          () => {
            form.resetFields();
            setIdToEdit(undefined);
          }
        )
      );
    }
  };

  useEffect(() => {
    form.setFieldsValue({ installmentFrequency: "Monthly" });
  }, [form]);

  useEffect(() => {
    if (idToEdit) {
      form.setFieldsValue({
        installmentFrequency: "Monthly",
        name: idToEdit?.name,
        CNIC: idToEdit.CNIC,
        accountNo: idToEdit.accountNo,
        installmentAmount: idToEdit.installmentAmount,
        fromDate: moment(idToEdit.fromDate), // Convert to moment object
        toDate: moment(idToEdit.toDate), // Convert to moment object
      });
    } else form.resetFields();
  }, [idToEdit]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          flex: "0.5",
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
              rules={[
                { required: true, message: "Please input Customer Name." },
              ]}
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
              <div style={{ display: "flex", gap: "20px" }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button type="primary" onClick={() => setIdToEdit(undefined)}>
                  Reset
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div style={{ display: "flex", flex: "0.5" }}>
        <AllCustomer setIdToEdit={setIdToEdit} />
      </div>
    </>
  );
};

export default FormComponent;
