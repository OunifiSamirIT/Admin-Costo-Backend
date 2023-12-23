import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../lib/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '.prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async encryption(password: string) {
    return await bcrypt.hashSync(password, 10);
  }

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const exist = await this.findUserByEmail(createUserDto.email);
    if (exist) {
      // throw new ConflictException('User exist');
      console.log("User exist")
    }
    await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: await this.encryption(createUserDto.password),
      },
    });
    return 'Success';
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        // birthday: true,
        image: true,
        role: true,
      },
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('Not Found User !!!!');
    }
    const { password, ...rest } = user;
    return rest;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const exist = await this.findOne(id);
    updateUserDto.password = await this.encryption(updateUserDto.password);
    const user = await this.prismaService.user.update({
      where: {
        id: exist.id,
      },
      data: updateUserDto,
    });
    const { password, ...rest } = user;
    return rest;
  }

  async remove(id: number) {
    const exist = await this.findOne(id);
    await this.prismaService.user.delete({
      where: {
        id: exist.id,
      },
    });
    return 'User deleted';
  }
}
