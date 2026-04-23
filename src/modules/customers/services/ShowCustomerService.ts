import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";
import { inject, injectable } from "tsyringe";

interface IShowCustomer {
  id: number;
}

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject("CustomersRepository")
    private readonly customerRepository: ICustomersRepository,
  ) {}
  
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    return customer;
  }
}
