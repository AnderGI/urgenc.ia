import FindProductByIdQuery from '../../../../../../apps/backoffice/backend/controllers/get-product-by-id/FindProductByIdQuery.js';
import Query from '../../../../../../shared/domain/query/Query.js';
import type QueryHandler from '../../../../../../shared/domain/query/QueryHandler.js'
import ProductByIdFinder from './ProductByIdFinder.js';
import ProductByIdFinderResponse from './ProductByIdFinderResponse.js';

export default class FindProductByIdQueryHandler implements QueryHandler<FindProductByIdQuery, ProductByIdFinderResponse>{
  constructor (private readonly finder:ProductByIdFinder){}

  subscribedTo(): Query {
    return FindProductByIdQuery;
  }
  async handle(query: FindProductByIdQuery): Promise<ProductByIdFinderResponse> {
    const product = await this.finder.run(query);
    return new ProductByIdFinderResponse(product.id.value, product.name.value)  
  }
}