import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    'origin':'http://localhost:4200'
  })
  app.use(helmet());
  const config = new DocumentBuilder()
      .setTitle("Gestion des associations")
      .setDescription("Descriptions des APIs de la gestion des associations")
      .setVersion("1.0")
      .addBearerAuth()
      .addServer(process.env.SWAGGER_PREFIX)
      .build();
  console.log(process.env.SWAGGER_PREFIX);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(3030);
}
bootstrap();
