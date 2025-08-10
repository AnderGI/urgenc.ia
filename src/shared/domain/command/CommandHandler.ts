import Command  from './Command.js';

export default interface CommandHandler<T extends Command> {
  subscribedTo(): Command;
  handle(command: T): Promise<void>;
}