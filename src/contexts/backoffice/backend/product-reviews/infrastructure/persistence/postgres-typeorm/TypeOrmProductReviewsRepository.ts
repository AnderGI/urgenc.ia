import { EntitySchema } from "typeorm";
import ProductId from "../../../domain/ProductId.js";
import TypeOrmRepository from '../../../../../../../shared/infrastructure/persistence/postgres-typeorm/TypeOrmRepository.js'
import type {Nullable} from '../../../../../../../shared/domain/Nullable.js'
import ProductReviews from "../../../domain/ProductReviews.js";
import { ProductReviewsEntity } from "./ProductReviewsEntity.js";
import type ProductReviewsRepository from "../../../domain/ProductReviewsRepository.js";
import type { Criteria } from "../../../../../../../shared/domain/criteria/Criteria.js";
import { TypeOrmCriteriaConverter } from "./TypeOrmCriteriaConverter.js";


export class TypeOrmProductReviewsRepository extends TypeOrmRepository<ProductReviews> implements ProductReviewsRepository {
  public save(productReviews: ProductReviews): Promise<void> {
    return this.persist(productReviews);
  }

  public async search(productReviewsId: ProductId): Promise<Nullable<ProductReviews>> {
    const repository = await this.repository();

    const course = await repository.findOne({ where: {productReviewsId} });

    return course;
  }
  
  public async matching(criteria: Criteria): Promise<ProductReviews[]> {
    const criteriaConverter = TypeOrmCriteriaConverter.create();
    console.log(criteria)
    console.log(`has filters ${criteria.hasFilters()}` )
    console.log(`has filters ${criteria.filters}` )
    console.log(`has filters ${criteria.hasOrders()}` )
    console.log(`has filters ${criteria.order}` )
    const findByCriteria = criteriaConverter.convert(criteria);
    console.log("############################# CONVERTER ############################");
    console.log(findByCriteria)
    return (await this.repository()).find(findByCriteria);
  }
  protected entitySchema(): EntitySchema<ProductReviews> {
    return ProductReviewsEntity;
  }
}