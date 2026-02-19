import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { UserModule } from '../user/user.module';
import { MinioModule } from '../minio/minio.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileRepository],
  imports: [PrismaModule, UserModule, MinioModule]
})
export class ProfileModule { }
