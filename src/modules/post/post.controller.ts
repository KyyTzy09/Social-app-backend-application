import { Body, Controller, HttpCode, HttpStatus, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ReqUserType } from 'src/shared/types/req-user.type';
import { CreatePostDto } from './dto/createPost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponseType } from 'src/shared/types/response.type';
import { Post as PostType } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post("create")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("content"))
  async CreatePost(@Req() req: ReqUserType, @UploadedFile() content: Express.Multer.File, @Body() dto: CreatePostDto): Promise<ApiResponseType<PostType>> {
    const result = await this.postService.createPost({ userId: req.user.userId, title: dto.title, description: dto.description, content })
    
    return { message: "Post created successfully", statusCode: HttpStatus.CREATED, data: result.data }
  }
}
