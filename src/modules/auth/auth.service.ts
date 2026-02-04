import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { RegisterDto } from './dto/register.dto';
import { CompareText, HashText } from 'src/shared/helpers/bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private readonly userRepo: UserRepository, private jwtService: JwtService, private readonly configService: ConfigService) { }

    async Register(dto: RegisterDto) {
        const existingUser = await this.userRepo.findByEmail(dto.email)
        if (existingUser) throw new NotFoundException("User is already registered")

        const hashedPassword = await HashText(dto.password)
        const createdUser = await this.userRepo.createUser(dto.fullName, dto.email, hashedPassword)

        return { data: createdUser }
    }

    async Login(dto: LoginDto) {
        const existingUser = await this.userRepo.findByEmail(dto.email)
        if (!existingUser) throw new NotFoundException("User is not registered")

        const comparePassword = await CompareText(dto.password, existingUser.password || "")
        if (!comparePassword) throw new BadRequestException("Incorrect password")

        const payload = { userId: existingUser.userId }
        const token = await this.jwtService.signAsync(payload, { secret: this.configService.get<string>("JWT_SECRET") })

        return { accessToken: token }
    }
}
