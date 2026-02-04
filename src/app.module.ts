import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaController } from './modules/prisma/prisma.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController, PrismaController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env.dev", }), PrismaModule],
})
export class AppModule { }
