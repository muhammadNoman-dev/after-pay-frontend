import axios from "axios";
import { GetCustomer, SubmitCustomer } from "../types/customer.types";

const ROOT_PATH = "customers";

export default class CustomerService {
  static submitCustomer = (addCustomer: SubmitCustomer) =>
    axios.post(`${ROOT_PATH}`, addCustomer);

  static getAllCustomers = () =>
    axios.get<Array<GetCustomer>>(`${ROOT_PATH}/getbulk-data`);

  static deleteCustomer = (id: string) => axios.delete(`${ROOT_PATH}/${id}`);

  static updateCustomer = (id: string, data: Partial<SubmitCustomer>) =>
    axios.put(`${ROOT_PATH}/${id}`, data);
}
