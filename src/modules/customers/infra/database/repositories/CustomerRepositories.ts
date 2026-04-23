import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Customer } from "../entities/Customer";
import {
  ICustomersRepository,
  Pagination,
} from "@modules/customers/domain/repositories/ICustomersRepositories";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateUser";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";

export default class customersRepository implements ICustomersRepository {
  private ormRepository = AppDataSource.getRepository(Customer);

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Customer);
  }

  async findByName(name: string): Promise<ICustomer[]> {
    const customer = await this.ormRepository.findBy({
      name,
    });

    return customer;
  }

  async findById(id: number): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      id,
    });

    return customer;
  }

  async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      email,
    });

    return customer;
  }

  async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  async save(customer: ICustomer): Promise<ICustomer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);

    return;
  }

  async findAndCount({
    skip,
    take,
  }: Pagination): Promise<[ICustomer[], number]> {
    const [customers, total] = await this.ormRepository.findAndCount({
      skip,
      take,
    });

    return [customers, total];
  }
}
