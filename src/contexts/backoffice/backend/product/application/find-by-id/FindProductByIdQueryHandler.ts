import FindProductByIdQuery from '../../../../../../apps/backoffice/backend/controllers/get-product-by-id/FindProductByIdQuery';
import Query from '../../../../../../shared/domain/query/Query';
import QueryHandler from '../../../../../../shared/domain/query/QueryHandler'
import ProductByIdFinder from './ProductByIdFinder';
import ProductByIdFinderResponse from './ProductByIdFinderResponse';

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