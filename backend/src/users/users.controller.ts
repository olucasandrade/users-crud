import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto).catch((e: Error) => {
      if (e.message.includes('unique')) {
        throw new BadRequestException('User with this email already exists');
      }
      throw new InternalServerErrorException('Unknown error');
    });
  }

  @Get()
  findAll(): Promise<UserModel[]> {
    return this.usersService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserModel | null> {
    return this.usersService.find({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({
      where: { id: Number(id) },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    try {
      await this.usersService.delete({ id: Number(id) });
      return { deleted: true };
    } catch (e) {
      console.error(e);
      return { deleted: false };
    }
  }
}
