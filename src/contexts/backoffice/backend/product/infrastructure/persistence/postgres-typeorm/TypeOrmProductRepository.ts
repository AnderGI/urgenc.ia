import { EntitySchema, type FindOneOptions } from "typeorm";
import Product from "../../../domain/Product.js";
import ProductId from "../../../domain/ProductId.js";
import type ProductRepository from "../../../domain/ProductRepository.js";
import { ProductEntity } from "./ProductEntity.js";
import TypeOrmRepository from '../../../../../../../shared/infrastructure/persistence/postgres-typeorm/TypeOrmRepository.js'
import type {Nullable} from '../../../../../../../shared/domain/Nullable.js'

export class TypeOrmProductRepository extends TypeOrmRepository<Product> implements ProductRepository {
  public save(product: Product): Promise<void> {
    return this.persist(product);
  }

  public async search(id: ProductId): Promise<Nullable<Product>> {
    const repository = await this.repository();

    const filter: FindOneOptions<Product> = {
      where: {
        id : id
      }
    }
    const course = await repository.findOne(filter);

    return course;
  }
  

  protected entitySchema(): EntitySchema<Product> {
    return ProductEntity;
  }
}