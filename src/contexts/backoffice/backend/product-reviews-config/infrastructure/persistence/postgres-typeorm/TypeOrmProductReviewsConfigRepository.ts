import { EntitySchema } from "typeorm";
import type { Nullable } from "../../../../../../../shared/domain/Nullable.js";
import TypeOrmRepository from "../../../../../../../shared/infrastructure/persistence/postgres-typeorm/TypeOrmRepository.js";
import ProductReviewsConfig from "../../../domain/ProductReviewsConfig.js";
import ProductReviewsConfigId from "../../../domain/ProductReviewsConfigId.js";
import type ProductReviewsConfigRepository from "../../../domain/ProductReviewsConfigRepository.js";
import { ProductReviewsConfigEntity } from "./ProductReviewsConfigEntity.js";


export class TypeOrmProductReviewsConfigRepository extends TypeOrmRepository<ProductReviewsConfig> implements ProductReviewsConfigRepository {
  public save(productReviews: ProductReviewsConfig): Promise<void> {
    return this.persist(productReviews);
  }

  public async search(id: ProductReviewsConfigId): Promise<Nullable<ProductReviewsConfig>> {
    const repository = await this.repository();

    const course = await repository.findOne({ where: {id} });

    return course;
  }

  protected entitySchema(): EntitySchema<ProductReviewsConfig> {
    return ProductReviewsConfigEntity;
  }
}