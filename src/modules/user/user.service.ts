import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { GetSessionDto } from './dto/getSession.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) { }
    async getSession(dto: GetSessionDto) {
        const existingUser = await this.userRepo.findById(dto.userId)
        if (!existingUser) throw new NotFoundException("User is not registered")

        return { data: existingUser }
    }
}
