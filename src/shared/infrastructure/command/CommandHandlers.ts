import type Command from "../../domain/command/Command.js";
import type CommandHandler from "../../domain/command/CommandHandler.js";
import { CommandNotRegisteredError } from "../../domain/command/CommandNotRegisteredError.js";

export class CommandHandlers {
  private readonly commandToHandlerRelation = new Map<
    Command,
    CommandHandler<Command>
  >();
  
  constructor(commandHandlers: CommandHandler<Command>[]) {

    commandHandlers.forEach(commandHandler => {
      this.commandToHandlerRelation.set(commandHandler.subscribedTo(), commandHandler);
    });

    console.log(commandHandlers)
  }

  public get(command: Command): CommandHandler<Command> {
    const commandHandler = this.commandToHandlerRelation.get(command.constructor);

    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }

    return commandHandler;
  }
}