import { Request, Response } from "express";
import ListCustomerService from "../../../services/ListCustomerService";
import ShowCustomerService from "../../../services/ShowCustomerService";
import CreateCustomerService from "../../../services/CreateCustomerService";
import DeleteCustomerService from "../../../services/DeleteCustomerService";
import UpdateCustomerService from "../../../services/UpdateCustomerService";
import { container } from "tsyringe";

export default class CustomersControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const listCustomers = container.resolve(ListCustomerService);
    const customers = await listCustomers.execute(page, limit);
    return response.json(customers);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const showCustomer = container.resolve(ShowCustomerService);
    const customer = await showCustomer.execute({ id });
    return response.json(customer);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomer = container.resolve(CreateCustomerService);
    const customer = await createCustomer.execute({ name, email });
    return response.json(customer);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const deleteCustomer = container.resolve(DeleteCustomerService);
    await deleteCustomer.execute({ id });
    return response.status(204).send();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const { name, email } = request.body;
    const updateCustomer = container.resolve(UpdateCustomerService);
    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });
    return response.json(customer);
  }
}
