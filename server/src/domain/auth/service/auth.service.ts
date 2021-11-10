import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from 'src/utils/bcrypt';
import { User } from '../../user/user.entity';
import { AuthRepository } from '../auth.repository';
import { LoginRequestDto } from '../dto/login-request.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { JoinRequestDto } from '../dto/join-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginRequestDto: LoginRequestDto) {
    const user: User = await this.authRepository.findUserByEmail(loginRequestDto.email);
    if (!user || !Bcrypt.compare(loginRequestDto.password, user.password)) throw new UnauthorizedException();
    const token = this.jwtService.sign({ email: loginRequestDto.email });
    const userInfo: UserResponseDto = new UserResponseDto(user);
    return { token, userInfo };
  }

  async join(joinRequestDto: JoinRequestDto) {
    const isExistUser = await this.authRepository.exists(joinRequestDto);
    if (isExistUser) throw new BadRequestException();
    const user: User = await this.authRepository.create();
    user.nickName = joinRequestDto.nickname;
    user.email = joinRequestDto.email;
    user.password = Bcrypt.hash(joinRequestDto.password);
    user.imageUrl = '디폴트 이미지 주소 자리';
    await this.authRepository.save(user);
    return true;
  }

  async getUserInfo(email: string) {
    const user: User = await this.authRepository.findUserByEmail(email);
    if (!user) throw new UnauthorizedException();
    const userInfo: UserResponseDto = new UserResponseDto(user);
    return userInfo;
  }
}
