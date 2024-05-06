import { Injectable } from '@nestjs/common';
import { CreateFullProfileDto } from './dto/create-profile.dto';
import { UpdateFullProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}
  
  async create(profileDto: CreateFullProfileDto) {
    const socialMediaDto = profileDto.socialMedia
    const addressDto = profileDto.address
    const basicProfileDto = profileDto.basicProfileDto

    const profile = await this.prisma.profile.create({
      data:basicProfileDto,
    });
    console.log(profile);

    if(socialMediaDto){
      const socialMedia = await this.prisma.links.create({
        data:{profileId:profile.id, ...socialMediaDto},
      });
    }
    if(addressDto){
      const address = await this.prisma.address.create({
        data:{profileId:profile.id, ...addressDto},
      });
    }

    // TODO AGGREGATE FUNCTION LINKS ADDRESS ETC
    return profile
  }

  async findAll() {
    return this.prisma.profile.findMany();
  }

  async findOne(id: number) {
    return this.prisma.profile.findUnique({ where: { userId:id } });
  }

  async update(id: number, updateFullProfileDto: UpdateFullProfileDto) {

    const socialMediaDto = updateFullProfileDto.socialMedia
    const addressDto = updateFullProfileDto.address
    const basicProfileDto = updateFullProfileDto.basicProfileDto

    let profile = await this.prisma.profile.findUnique({
      where:{userId:id}
    })
    if(!profile){
      return NaN
      // TODO RAISE EXCEPTOION 404 ERROR CODE AND SO ON
    }

    if(basicProfileDto){
      profile = await this.prisma.profile.update({
        where: { userId: id },
        data: basicProfileDto,
      });
    }

    if(socialMediaDto){
      const socialMedia = await this.prisma.links.update({
        where:{profileId:id},
        data:{profileId:profile.id, ...socialMediaDto}
      });
    }

    if(addressDto){
      const address = await this.prisma.address.update({
        where:{profileId: id},
        data:{profileId:profile.id, ...addressDto},
      });
    }

    return profile
  }

  async remove(id: number) {
    return this.prisma.profile.delete({ where: { userId:id } });
  }
}
