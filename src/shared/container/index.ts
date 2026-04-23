import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepositories";
import customersRepository from "@modules/customers/infra/database/repositories/CustomerRepositories";
import { container } from "tsyringe";

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  customersRepository,
);
