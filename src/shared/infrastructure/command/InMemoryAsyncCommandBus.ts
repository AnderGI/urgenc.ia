import type Command from "../../domain/command/Command.js";
import type CommandBus from "../../domain/command/CommandBus.js";
import type { CommandHandlers } from "./CommandHandlers.js";


export class InMemoryAsyncCommandBus implements CommandBus {
  constructor(readonly commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command);

    await handler.handle(command);
  }
}
