import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Type } from 'class-transformer';
import { RoomAPIDocs } from '../room.docs';
import { Pagination } from 'src/paginate';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth-guard';
import { Room, RoomType, roomTypeToArray } from '../room.entity';
import { RoomService } from '../service/room.service';
import { CreateRoomRequestDto } from '../dto/create-room-request.dto';
import { CreateRoomResponseDto } from '../dto/create-room-response.dto';

@ApiTags('Room API / 방 API')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {
  }

  @Get()
  @ApiOperation(RoomAPIDocs.getRoomListByTypeOperation())
  @ApiQuery(RoomAPIDocs.getRoomListByTypeQueryType())
  @ApiQuery(RoomAPIDocs.getRoomListByTypeQuerySearch())
  @ApiQuery(RoomAPIDocs.getRoomListByTypeQueryTake())
  @ApiQuery(RoomAPIDocs.getRoomListByTypeQueryPage())
  async getRoomListByType(
    @Query('type') type: RoomType,
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ): Promise<{ result: Pagination<Room> }> {
    return { result: await this.roomService.getRoomListAll({ search, take, page }, type) };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRoom(
    @Req() req: Request,
    @Body() createRoomRequestDto: CreateRoomRequestDto,
  ): Promise<{ result: CreateRoomResponseDto }> {
    const userEmail = req.user['email'];
    return { result: await this.roomService.createRoom(createRoomRequestDto, userEmail) };
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'UUID로 방 조회', description: '방의 고유 UUID로 정보를 조회합니다.' })
  @ApiParam(RoomAPIDocs.getRoomByUUIDParamUUID())
  async getRoomByUUID(@Param('uuid') uuid): Promise<{ result: Room }> {
    return { result: await this.roomService.getRoomByUUID(uuid) };
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(@Req() req: Request, @Param('uuid') uuid): Promise<{ result: boolean }> {
    const userEmail = req.user['email'];
    return { result: await this.roomService.deleteRoom(userEmail, uuid) };
  }
}
