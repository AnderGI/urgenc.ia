import { EntitySchema } from "typeorm";
import Product from "../../../domain/Product.js";
import ValueObjectTransformer from '../../../../../../../shared/infrastructure/persistence/postgres-typeorm/ValueObjectTransformer.js'
import ProductId from "../../../domain/ProductId.js";
import ProductName from "../../../domain/ProductName.js";

export const ProductEntity = new EntitySchema<Product>({
  name: 'Product',
  tableName: 'products',
  target: Product,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(ProductId)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(ProductName)
    }
  }
});