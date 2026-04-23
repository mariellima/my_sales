import { Request, Response } from "express";
import { ShowOrderService } from "../../../services/ShowOrderService";
import { CreateOrderService } from "../../../services/CreateOrderService";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepositories";

export default class OrdersController {
  constructor(private readonly customerRepository: ICustomersRepository) {}

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as { id: string };

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute(id);

    return response.json(order);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products} = request.body;
    const createOrder = new CreateOrderService(this.customerRepository);

    const order = await createOrder.execute({
      customer_id,
      products
    });

    return response.json(order);
  }
}
