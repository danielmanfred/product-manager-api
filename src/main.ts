import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exception-filters/prisma.exception-filter';
import { CatchAllErrorsExceptionFilter } from './exception-filters/catch-all-errors.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new CatchAllErrorsExceptionFilter(),
    new PrismaExceptionFilter()
  )

  await app.listen(3000);
}
bootstrap();
