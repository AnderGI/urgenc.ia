import type Command from "./Command.js";

export default interface CommandBus {
  dispatch(command: Command): Promise<void>;
}

