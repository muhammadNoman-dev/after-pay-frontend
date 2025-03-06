export interface SubmitCustomer {
  name: string;
  CNIC: string;
  accountNo: string;
  installmentAmount: Number;
  fromDate: string;
  toDate: string;
  installmentFrequency: string;
}

export interface GetCustomer {
  _id: string;
  name: string;
  CNIC: string;
  accountNo: string;
  installmentAmount: Number;
  fromDate: string;
  toDate: string;
  installmentFrequency: string;
  createdAt: string;
  updatedAt: string;
  entryDateTime: string;
}
