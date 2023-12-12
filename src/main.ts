import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exception-filters/prisma.exception-filter';
import { CatchAllErrorsExceptionFilter } from './exception-filters/catch-all-errors.exception-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new CatchAllErrorsExceptionFilter(),
    new PrismaExceptionFilter()
  )

  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }))

  await app.listen(3000);
}
bootstrap();
