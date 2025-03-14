import { Space, Table, TableProps } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { allCustomers, getCustomers } from "../store/customer.slice";
import { useEffect } from "react";

interface DataType {
  _id: string;
  name: string;
  CNIC: string;
  accountNo: string;
  installmentAmount: Number;
  fromDate: string;
  toDate: string;
  //   installmentFrequency: string;
  //   entryDateTime: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "S.No",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "CNIC",
    dataIndex: "CNIC",
    key: "CNIC",
  },
  {
    title: "Account No.",
    dataIndex: "accountNo",
    key: "accountNo",
  },
  {
    title: "Installment Amount",
    dataIndex: "installmentAmount",
    key: "installmentAmount",
  },
  {
    title: "From Date",
    dataIndex: "fromDate",
    key: "fromDate",
  },
  {
    title: "To Date",
    dataIndex: "toDate",
    key: "toDate",
  },
  // {
  //   title: 'Installment Frequency',
  //   dataIndex: 'installmentFrequency',
  //   key: 'installmentFrequency',
  // },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <a onClick={() => console.warn("record: ", record)}>Edit</a>
  //         <a onClick={() => console.warn("__: ", _)}>Delete</a>
  //       </Space>
  //     ),
  //   },
];

const AllCustomerData = () => {
  const customersData = useAppSelector(allCustomers());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCustomers());

    // return () => {
    //   second
    // }
  }, []);

  return (
    <>
      <Table<DataType> columns={columns} dataSource={customersData} />
    </>
  );
};

export default AllCustomerData;
