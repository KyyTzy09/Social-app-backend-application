import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/createPost.dto';
import { UserRepository } from '../user/user.repository';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class PostService {
    constructor(private readonly postRepo: PostRepository, private readonly userRepo: UserRepository, private readonly minioService: MinioService) { }

    async getAllPosts() {
        const existingPosts = await this.postRepo.getAll()
        if (existingPosts.length === 0) throw new NotFoundException("Post not founds")

        return { data: existingPosts }
    }

    async createPost(dto: CreatePostDto) {
        const existingUser = await this.userRepo.findById(dto.userId)
        if (!existingUser) throw new NotFoundException("User not found")

        const uploadedContent = await this.minioService.Uploader({ file: dto.content, directory: "post" })
        const createdPost = await this.postRepo.createPost(dto.userId, dto.title, dto.description, uploadedContent)

        return { data: createdPost }
    }
}
