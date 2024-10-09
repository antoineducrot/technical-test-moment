import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Moment API")
    .setDescription("This is the API for the Moment app.")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);

  await app.listen(4000);
}

void bootstrap();
