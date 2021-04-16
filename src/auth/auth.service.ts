import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentilsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentilsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.validateUserPassword({
      username,
      password,
    });
    if (!user) {
      throw new UnauthorizedException('Inavlid credentials');
    } else {
      const payload: JwtPayload = { username: user };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
  }
}
