import { Space, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  allCustomers,
  deleteCustomerById,
  getCustomers,
} from "../store/customer.slice";
import { useEffect } from "react";
import { GetCustomer } from "../types/customer.types";

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

interface Props {
  setIdToEdit: React.Dispatch<React.SetStateAction<GetCustomer | undefined>>;
}

const AllCustomerData: React.FC<Props> = ({ setIdToEdit }) => {
  const customersData = useAppSelector(allCustomers());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  return (
    <>
      <Table<DataType>
        columns={[
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
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <a
                  onClick={() => {
                    setIdToEdit(record as GetCustomer);
                    console.warn("record: ", record);
                  }}
                >
                  Edit
                </a>
                <a
                  onClick={() => {
                    dispatch(deleteCustomerById(record._id));
                  }}
                >
                  Delete
                </a>
              </Space>
            ),
          },
        ]}
        dataSource={customersData}
      />
    </>
  );
};

export default AllCustomerData;
