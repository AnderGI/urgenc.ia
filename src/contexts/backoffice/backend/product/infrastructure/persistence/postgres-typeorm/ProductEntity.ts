import { EntitySchema } from "typeorm";
import Product from "../../../domain/Product";
import ValueObjectTransformer from '../../../../../../../shared/infrastructure/persistence/postgres-typeorm/ValueObjectTransformer.js'
import ProductId from "../../../domain/ProductId";
import ProductName from "../../../domain/ProductName";

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