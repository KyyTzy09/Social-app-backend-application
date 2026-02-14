import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { GetCategoriesWithPaginationDto } from './dto/getCategoriesWithPagination.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepo: CategoryRepository) { }

    async getCategoriesWithPagination(dto: GetCategoriesWithPaginationDto) {
        const skip = (dto.page - 1) * dto.limit
        const rowCounts = await this.categoryRepo.count();

        const existingCategories = await this.categoryRepo.findAllWithPagination(skip, dto.limit)
        if (existingCategories.length === 0) throw new NotFoundException("Categories not found")

        return { data: existingCategories, maxPage: Math.ceil(rowCounts / dto.limit) }
    }

    async getAllCategories() {
        const existingCategories = await this.categoryRepo.findAll()
        if (existingCategories.length === 0) throw new NotFoundException("Categories not found")

        return { data: existingCategories }
    }
}
