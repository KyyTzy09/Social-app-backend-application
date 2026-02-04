import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { RegisterDto } from './dto/register.dto';
import { HashText } from 'src/shared/helpers/bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userRepo: UserRepository) { }

    async Register(dto: RegisterDto) {
        var existingUser = await this.userRepo.findByEmail(dto.email)
        if (existingUser) throw new NotFoundException("User is already registered")

        var hashedPassword = await HashText(dto.password)
        var createdUser = await this.userRepo.createUser(dto.fullName, dto.email, hashedPassword)

        return { data: createdUser }
    }
}
