import RedisCache from "@shared/cache/RedisCache";
import { Product } from "../database/entities/Product";
import { productsRepositories } from "../database/repositories/ProductsRepositories";

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const rediscache = new RedisCache();

    let products = await rediscache.recover<Product[]>(
      "api-mysales-PRODUCT_LIST",
    );

    if (!products) {
      products = await productsRepositories.find();

      await rediscache.save(
        "api-mysales-PRODUCT_LIST",
        JSON.stringify(products),
      );
      return products;
    }

    // const products = await productsRepositories.find();
    return products;
  }
}
