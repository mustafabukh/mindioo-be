import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfilesService } from 'src/profiles/profiles.service';

import * as bcrypt from 'bcrypt';
export const roundsOfHashing = 8;

@Injectable()
export class UsersService {
  constructor(
              private readonly prisma: PrismaService,
              private readonly profilesService: ProfilesService,
              ) {}

  
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
    createUserDto.password,
    roundsOfHashing,
    );
    
    createUserDto.password = hashedPassword;

    const user = await this.prisma.user.create({
    data: createUserDto,
    });

    console.log(user);

    // TODO ADD PROFILE
    // TODO ADD SOCIALMEDIA LINKS
    // TODO ADD ADDRESS FIELDS
    // WITH EMPTY OR DEFAULT VALUES

    // if (!user) {
    //   await this.profilesService.create({
    //     userId: user.id,
    //     firstName: '', 
    //     lastName: '',
    //   });
    // }

    return user
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
