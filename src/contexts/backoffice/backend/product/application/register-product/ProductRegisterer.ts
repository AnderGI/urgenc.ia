import Product from "../../domain/Product";
import ProductRepository from "../../domain/ProductRepository";
import EventBus from '../../../../../../shared/domain/event/EventBus.js'
import ProductRegisteredDomainEvent from './ProductRegisteredDomainEvent'
import RegisterProductCommand from "../../../../../../apps/backoffice/backend/controllers/register-product/RegisterProductCommand";

export default class ProductRegisterer {
  constructor (readonly repository:ProductRepository, readonly eventBus:EventBus) {}
  public async register(command: RegisterProductCommand):Promise<void> {
    const product = Product.fromPrimitives(command.productId, command.productName);
    this.repository.save(product)
    const event = new ProductRegisteredDomainEvent(product.id.value)
    this.eventBus.publish(event)
  }
}