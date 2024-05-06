import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfilesService } from 'src/profiles/profiles.service';

import * as bcrypt from 'bcrypt';
import { UserType } from '@prisma/client';
import { genders, vendorCategories } from 'src/utils/mapEnums';
export const roundsOfHashing = 8;

@Injectable()
export class UsersService {
  constructor(
              private readonly prisma: PrismaService,
              private readonly profilesService: ProfilesService,
              ) {}

  
  async create(createUserDto: CreateUserDto, userType: UserType) {
    const hashedPassword = await bcrypt.hash(
    createUserDto.password,
    roundsOfHashing,
    );
    
    createUserDto.password = hashedPassword;

    createUserDto.userType = userType

    const user = await this.prisma.user.create({
    data: createUserDto,
    });

    console.log(user);

    // TODO ADD PROFILE
    // TODO ADD SOCIALMEDIA LINKS
    // TODO ADD ADDRESS FIELDS
    // WITH EMPTY OR DEFAULT VALUES

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
    this.prisma.profile.delete({ where: { id } });
    return this.prisma.user.delete({ where: { id } });
  }

  getGenders() {
    return genders;
  }

  getCategories() {
    return vendorCategories;
  }
}
