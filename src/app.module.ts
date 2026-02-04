import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaController } from './modules/prisma/prisma.controller';

@Module({
  controllers: [AppController, PrismaController],
  providers: [AppService],
  imports: [PrismaModule],
})
export class AppModule {}
