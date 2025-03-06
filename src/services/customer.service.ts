import axios from "axios";
import { SubmitCustomer } from "../types/customer.types";

const ROOT_PATH = "customers";

export default class CustomerService {
  static submitCustomer = (addCustomer: SubmitCustomer) =>
    axios.post(`${ROOT_PATH}`, addCustomer);
}
