import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { MinioModule } from '../minio/minio.module';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostRepository],
  imports: [PrismaModule, MinioModule, UserModule]
})
export class PostModule { }
