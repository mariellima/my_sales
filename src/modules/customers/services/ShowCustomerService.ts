import AppError from "@shared/errors/AppError";
import { Customer } from "../database/entities/Customer";
import { customerRepository } from "./../database/repositories/CustomerRepository";

interface IShowCustomer {
  id: number;
}

export default class ShowCustomerService {
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await customerRepository.findbyId(id);

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    return customer;
  }
}
