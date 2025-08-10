export default class ProductByIdFinderResponse extends Response {
  constructor (readonly id:string, readonly name:string) {
    super()
  }
}