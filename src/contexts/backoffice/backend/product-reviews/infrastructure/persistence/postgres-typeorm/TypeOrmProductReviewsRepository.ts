import { EntitySchema } from "typeorm";
import ProductId from "../../../domain/ProductId.js";
import TypeOrmRepository from '../../../../../../../shared/infrastructure/persistence/postgres-typeorm/TypeOrmRepository.js'
import type {Nullable} from '../../../../../../../shared/domain/Nullable.js'
import ProductReviews from "../../../domain/ProductReviews.js";
import { ProductReviewsEntity } from "./ProductReviewsEntity.js";
import type ProductReviewsRepository from "../../../domain/ProductReviewsRepository.js";
/*
'../../../../../../contexts/backoffice/backend/
product-reviews/infrastructure/persistence/postgres-typeorm/TypeOrmProductReviewsRepository'
*/

export class TypeOrmProductReviewsRepository extends TypeOrmRepository<ProductReviews> implements ProductReviewsRepository {
  public save(productReviews: ProductReviews): Promise<void> {
    return this.persist(productReviews);
  }

  public async search(productReviewsId: ProductId): Promise<Nullable<ProductReviews>> {
    const repository = await this.repository();

    const course = await repository.findOne({ where: {productReviewsId} });

    return course;
  }
  

  protected entitySchema(): EntitySchema<ProductReviews> {
    return ProductReviewsEntity;
  }
}