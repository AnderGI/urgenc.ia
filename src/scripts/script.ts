import RegisterProductCommand from "../apps/backoffice/backend/controllers/register-product/RegisterProductCommand.js";
import container from "../apps/backoffice/backend/dependency-injection/node-dependency-injection/index.js";
import type { CommandHandlers } from "../shared/infrastructure/command/CommandHandlers.js";

const commandHandlers:CommandHandlers = container.get('Backoffice.CommandBus.CommandHandlers')

// Esto funciona si `get()` internamente usa `command.constructor`
const instance = new RegisterProductCommand("123", "Product Name");
commandHandlers.get(instance);
