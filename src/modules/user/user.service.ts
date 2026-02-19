import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { GetSessionDto } from './dto/getSession.dto';
import { CreateUserInterestDto } from './dto/createUserIntrerest.dto';
import { UserInterestRepository } from './userInterest.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository, private readonly userInterestRepo: UserInterestRepository) { }

    async getAllUsers() {
        const existingUsers = await this.userRepo.findAll()
        if (existingUsers.length === 0) throw new NotFoundException("Users not found")

        return { data: existingUsers }
    }

    async getSession(dto: GetSessionDto) {
        const existingUser = await this.userRepo.findById(dto.userId)
        if (!existingUser) throw new NotFoundException("User is not registered")

        return { data: existingUser }
    }

    async createUserInterest(dto: CreateUserInterestDto) {
        const existingUser = await this.userRepo.findById(dto.userId)
        if (!existingUser) throw new NotFoundException("User is not registered")

        const createdUserInterest = await this.userInterestRepo.createMany(dto.userId, dto.categoriesId)

        return { data: createdUserInterest }
    }
}
