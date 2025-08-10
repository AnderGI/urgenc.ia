import Query from "../../../../../shared/domain/query/Query.js";

export default class FindProductByIdQuery extends Query{
  constructor (readonly id:string){
    super()
  }
}