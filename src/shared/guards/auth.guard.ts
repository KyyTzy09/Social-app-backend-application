import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private configService: ConfigService) { }

  private extractTokenFromCookies(req: Request): string | undefined {
    const token = req.cookies["accessToken"]
    return token || undefined
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromCookies(request)
    if (!token) throw new UnauthorizedException("Access token not found")

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_SECRET")
      }) as { userId: string }

      request["user"] = payload
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true
  }
}