import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserService } from '../service/user.service';
import { User } from '../user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth-guard';
import { ImageService } from '../../image/service/image.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Param('userId') id) {
    return { result: await this.userService.getUserInfo(id) };
  }

  @Patch('/:userId')
  @UseGuards(JwtAuthGuard)
  async patchUserInfo(@Param('userId') id, @Body() userUpdateDto: UserUpdateDto) {
    return { result: await this.userService.updateUserInfo(id, userUpdateDto) };
  }

  @Get('/:userId/log')
  @UseGuards(JwtAuthGuard)
  getUserLog(@Param('userId') id): void {
    return;
  }

  @Post('/:userId/log')
  @UseGuards(JwtAuthGuard)
  addUserLog(@Param('userId') id): void {
    return;
  }

  @Post('/:userId/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserImage(@Param('userId') id, @UploadedFile() file: Express.Multer.File) {
    return { result: await this.userService.updateImage(id, file) };
  }

  @Patch('/:userId/image')
  @UseGuards(JwtAuthGuard)
  patchUserImage(@Param('userId') id): void {
    return;
  }

  @Delete('/:userId/image')
  @UseGuards(JwtAuthGuard)
  deleteUserImage(@Param('userId') id): void {
    return;
  }

  @Post('/:userId/time')
  @UseGuards(JwtAuthGuard)
  addUserPlayTime(@Param('userId') id): void {
    return;
  }

  @Get('/:userId/follows')
  @UseGuards(JwtAuthGuard)
  getUserFollowList(@Param('userId') id): void {
    return;
  }

  @Post('/:userId/follows')
  @UseGuards(JwtAuthGuard)
  addUserFollow(@Param('userId') id): void {
    return;
  }

  @Delete('/:userId/follows')
  @UseGuards(JwtAuthGuard)
  deleteUserFollow(@Param('userId') id): void {
    return;
  }
}
