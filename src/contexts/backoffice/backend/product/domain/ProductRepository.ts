import { type Nullable } from "../../../../../shared/domain/Nullable.js";
import Product from "./Product.js";
import ProductId from "./ProductId.js";

export default interface ProductRepository {
  save(_:Product): Promise<void>;
  search(_:ProductId): Promise<Nullable<Product>>
}