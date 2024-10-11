import { execSync } from "node:child_process";

import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

import { PrismaService } from "../src/database/prisma.service";

let postgresContainer: StartedPostgreSqlContainer;
let prismaService: PrismaService;

beforeAll(async () => {
  postgresContainer = await new PostgreSqlContainer().start();

  const databaseUrl = `postgresql://${postgresContainer.getUsername()}:${postgresContainer.getPassword()}@${postgresContainer.getHost()}:${postgresContainer.getPort()}/${postgresContainer.getDatabase()}`;

  execSync(`DATABASE_URL=${databaseUrl} npx prisma migrate dev`);

  prismaService = new PrismaService({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
});

afterAll(async () => {
  await postgresContainer.stop();
});

export { prismaService };
