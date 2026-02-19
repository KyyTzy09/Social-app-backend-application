import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './user.repository';
import { UserInterestRepository } from './userInterest.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserInterestRepository],
  imports: [PrismaModule],
  exports: [UserRepository]
})
export class UserModule { }
