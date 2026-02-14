import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiResponseType } from 'src/shared/types/response.type';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get("/")
  async GetCategoriesWithPagination(@Query("page") page: number, @Query("limit") limit: number) {
    const result = await this.categoryService.getCategoriesWithPagination({ page, limit })
    return { message: "Categories data retrieved successfully", statusCode: HttpStatus.OK, data: result.data, pagination: { page, limit, maxPage: result.maxPage } }
  }

  
}
