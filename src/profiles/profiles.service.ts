import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}
  
  async create(createProfileDto: CreateProfileDto) {
    const profile = await this.prisma.profile.create({
    data: createProfileDto,
    });

    console.log(profile);
    return profile
  }

  findAll() {
    return this.prisma.profile.findMany();
  }

  findOne(id: number) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  remove(id: number) {
    return this.prisma.profile.delete({ where: { id } });
  }
}
