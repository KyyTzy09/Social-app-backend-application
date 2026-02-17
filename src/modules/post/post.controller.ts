import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ReqUserType } from 'src/shared/types/req-user.type';
import { CreatePostDto } from './dto/createPost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponseType } from 'src/shared/types/response.type';
import { Post as PostType } from '@prisma/client';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get("/")
  @UseGuards(AuthGuard)
  async GetAllPosts(): Promise<ApiResponseType<Partial<PostType>[]>> {
    const result = await this.postService.getAllPosts()
    return { message: "posts retrieved successfully", statusCode: HttpStatus.OK, data: result.data }
  }

  @Get("user")
  @UseGuards(AuthGuard)
  async GetUserPost(@Req() req: ReqUserType): Promise<ApiResponseType<Partial<PostType>[]>> {
    const result = await this.postService.getUserPost({ userId: req.user.userId })
    return { message: "Post retrieved successfully", statusCode: HttpStatus.OK, data: result.data }
  }

  @Post("create")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("content"))
  async CreatePost(@Req() req: ReqUserType, @UploadedFile() content: Express.Multer.File, @Body() dto: CreatePostDto): Promise<ApiResponseType<PostType>> {
    const result = await this.postService.createPost({ userId: req.user.userId, title: dto.title, description: dto.description, content, categoriesId: dto.categoriesId })

    return { message: "Post created successfully", statusCode: HttpStatus.CREATED, data: result.data }
  }

  @Patch("update")
  @UseGuards(AuthGuard)
  async UpdatePost(@Req() req: ReqUserType, @Param("postId") postId: string, @Body() dto: UpdatePostDto): Promise<ApiResponseType<PostType>> {
    const result = await this.postService.updatePost({ userId: req.user.userId, postId, title: dto.title, description: dto.description })
    return { message: "Post updated successfully", statusCode: HttpStatus.OK, data: result.data }
  }
}
