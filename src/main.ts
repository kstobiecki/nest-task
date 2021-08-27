import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { Database, verbose } from 'sqlite3';
import { Connection, getConnection } from 'typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ItemRepository } from './item.repository';

// For typorm purposes we included in-memory sqlite db
const db: Promise<Database> = new Promise((resolve, reject) => {
  const sqlite3 = verbose();
  const database = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      reject(err);
    }

    resolve(database);
  });
});

// In ugly way filling the db
const fillDatabase = async (): Promise<void> => {
  const connection: Connection = await getConnection();
  await connection.manager
    .getCustomRepository(ItemRepository)
    .save([
      { name: 'Vizlib Library' },
      { name: 'Vizlib Self-Service' },
      { name: 'Vizlib Finance' },
      { name: 'Vizlib Gantt' },
      { name: 'Vizlib Collaboration' },
    ]);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('vizlib');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await db;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const config = new DocumentBuilder()
    .setTitle('VizLib recruitment task')
    .setDescription('API for handling items')
    .setVersion('1.0')
    .addTag('Items')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000, () => {
    Logger.log('App is listening on port 3000');
    fillDatabase();
  });
}

bootstrap();
