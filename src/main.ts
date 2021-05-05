import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import * as admin from 'firebase-admin';

var serviceAccount = require('../serviceAccountKey.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  // handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());

  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const options = new DocumentBuilder()
    .setTitle('Hydroponic API v1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: { docExpansion: 'none' },
  });

  await app.listen(4000);
}
bootstrap();
