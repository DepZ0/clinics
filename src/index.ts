import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { App } from "./app";
import "dotenv/config";
import { ClinicsDb } from "./database/clinicsDb";
import { ClinicsService } from "./express/services/clinicsService";
import { ClinicsController } from "./express/controllers/clinicsController";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { logger: false });

  await migrate(db, { migrationsFolder: "drizzle" });

  const clinicsDb = new ClinicsDb(db, pool);
  const clinicsService = new ClinicsService(clinicsDb);
  const clinicsController = new ClinicsController(clinicsService);

  const app = new App(3000, [clinicsController]);
  app.start();
}

main();
