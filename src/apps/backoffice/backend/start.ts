import path from "path";
import container from "./dependency-injection/node-dependency-injection/index.js";
import { config } from "dotenv";


config({
  path: path.join(process.cwd(), '.env.local')
})
try {
  const app = container.get("Apps.Backoffice.Backend.BackofficeBackendApp");
  await app.start();
  await app.registerRoutes();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  process.exit(1);
});
