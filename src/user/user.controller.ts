import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.userService.create(createUserDto, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // Update user status
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateStatus(id, updateUserDto);
  }

  // Update user can eat
  @Patch(':id/can_eat')
  updateCanEat(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateCanEat(id, updateUserDto);
  }

  // Update user can drink
  @Patch(':id/can_drink')
  updateCanDrink(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateCanEat(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Req() req: Request) {
    return this.userService.remove(req);
  }
}
