import { Nullable } from "../../../../../shared/domain/Nullable";
import Product from "./Product";
import ProductId from "./ProductId";

export default interface ProductRepository {
  save(_:Product): Promise<void>;
  search(_:ProductId): Promise<Nullable<Product>>
}