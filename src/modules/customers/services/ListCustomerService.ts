import { Customer } from "../database/entities/Customer";
import { customerRepository } from "../database/repositories/CustomerRepository";

export default class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customers = customerRepository.find();
    return customers;
  }
}
