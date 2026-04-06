import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/createPost.dto';
import { UserRepository } from '../user/user.repository';
import { MinioService } from '../minio/minio.service';
import { GetUserPost } from './dto/getUserPosr.dto';
import { CategoryService } from '../category/category.service';
import { UpdatePostDto } from './dto/updatePost.dto';
import { DeletePostDto } from './dto/deletePost.dto';
import { GetPostPagination } from './dto/getPostPagination';

@Injectable()
export class PostService {
    constructor(private readonly postRepo: PostRepository, private readonly userRepo: UserRepository, private readonly minioService: MinioService, private readonly categoryService: CategoryService) { }

    async getAllPosts(dto: GetPostPagination) {
        const skip = (dto.page - 1) * dto.limit
        const existingPosts = await this.postRepo.getAllPostWithPagination(dto.limit, skip)
        if (existingPosts.length === 0) throw new NotFoundException("Post not founds")

        return { data: existingPosts, page: dto.page, limit: dto.limit }
    }

    async getUserPost(dto: GetUserPost) {
        const existingUser = await this.userRepo.findById(dto.userId)
        if (!existingUser) throw new NotFoundException("User not found")

        const existingPosts = await this.postRepo.getUserPost(dto.userId)
        if (existingPosts.length === 0) throw new NotFoundException("Post not found");

        return { data: existingPosts }
    }

    async createPost(dto: CreatePostDto) {
        const existingUser = await this.userRepo.findById(dto.userId)
        if (!existingUser) throw new NotFoundException("User not found")

        const uploadedContent = await this.minioService.Uploader({ file: dto.content, directory: "post" })
        const createdPost = await this.postRepo.createPost(dto.userId, dto.title, dto.description, uploadedContent)

        await this.categoryService.createPostCategories(createdPost.postId, dto.categoriesId)
        return { data: createdPost }
    }

    async updatePost(dto: UpdatePostDto) {
        const isOwner = await this.userRepo.findById(dto.userId)
        if (!isOwner) throw new ForbiddenException("You is not an owner this post")

        const existingPost = await this.postRepo.getById(dto.postId)
        if (!existingPost) throw new NotFoundException("Post not found")

        const updatedPost = await this.postRepo.updatePost(dto.postId, dto.title, dto.description)

        return { data: updatedPost }
    }

    async deletePost(dto: DeletePostDto) {
        const isOwner = await this.userRepo.findById(dto.userId)
        if (!isOwner) throw new ForbiddenException("You is not an owner this post")

        const existingPost = await this.postRepo.getById(dto.postId)
        if (!existingPost) throw new NotFoundException("Post not found")

        const deletedPost = await this.postRepo.deleteById(dto.postId)
        return { data: deletedPost }
    }
}
