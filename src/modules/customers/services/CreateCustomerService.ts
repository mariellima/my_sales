import AppError from "@shared/errors/AppError";
import { customerRepository } from "../database/repositories/CustomerRepository";
import { Customer } from "../database/entities/Customer";

interface IcreateCustomer {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: IcreateCustomer): Promise<Customer> {
    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.");
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}
