import Command from "../../../../../shared/domain/command/Command.js";

export default class RegisterProductCommand extends Command{
  
  constructor (readonly productId:string, readonly productName:string){
    super()
  }

}