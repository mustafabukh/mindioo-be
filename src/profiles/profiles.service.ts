import { Injectable } from '@nestjs/common';
import { CreateFullProfileDto } from './dto/create-profile.dto';
import { UpdateFullProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile } from '@prisma/client';
import { UsersFilter } from 'src/utils/filters';
import { PrismaFilterObj, addWhereClause, AddIncludeClause } from 'src/utils/prismaFilterObj';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}
  
  async create(profileDto: CreateFullProfileDto, userId: number) {
    const socialMediaDto = profileDto.socialMedia
    const addressDto = profileDto.address
    const basicProfileDto = profileDto.basicProfileDto

    basicProfileDto.userId = userId
    console.log(basicProfileDto);

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
    // TODO REMOVE UNECCASSRY CONSTANT
    // TODO REMOVE UNECCASSRY CONSOLE LOGS
    // TODO ADD LOGGING
    
    return profile
  }

  async findAll() {
    return this.prisma.profile.findMany();
  }

  async findAllWithfilter(filters : UsersFilter) {
     
    

    // let filterobj2 = new PrismaFilterObj() 
    // filterobj2 = addWhere(filterobj2,{
    //   OR: [
    //     {
    //       firstName:{
    //         contains:""
    //       } 
    //     },
    //     {
    //       lastName:{
    //         contains:""
    //       } 
    //     }
    //   ]
    // })
    // console.log(filterobj2)


    let filterObj =  {
      where:{
      },
      include :{

      }
    }
    
    console.log(filterObj)
    if(filters.name){
      filterObj.where = {...filterObj.where, OR: [
        {
          firstName:{
            contains:filters.name
          } 
        },
        {
          lastName:{
            contains:filters.name
          } 
        }
      ] }
    }
    if(filters.categories) {
      filterObj.include = {
        ...filterObj.include,
        user: true,
      }
      filterObj.where = {...filterObj.where, user:{
        categories: {
          hasEvery:filters.categories
        }
      } }
    }
    if(filters.city || filters.state) {
      filterObj.include = {
        ...filterObj.include,
        address: true,
      }
      if(filters.city) {
        filterObj.where = {...filterObj.where, address:{
          city:{
            contains:filters.city
          }
        } }
      }
      if(filters.state) {
        filterObj.where = {...filterObj.where, address:{
          city:{
            contains:filters.state
          }
        } }
      }
    }
    console.log(filterObj)

    return this.prisma.profile.findMany(filterObj);
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
    const profileId = profile.id
    if(!profile){
      return NaN
      // TODO RAISE EXCEPTOION 404 ERROR CODE AND SO ON
    }
    console.log(profile)
    console.log(basicProfileDto)
    if(basicProfileDto){
      profile = await this.prisma.profile.update({
        where: { userId: id },
        data: basicProfileDto,
      });
    }

    if(socialMediaDto){
      const socialMedia = await this.prisma.links.update({
        where:{profileId: profileId},
        data:{profileId:profile.id, ...socialMediaDto}
      });
    }

    if(addressDto){
      const address = await this.prisma.address.update({
        where:{profileId: profileId},
        data:{profileId:profile.id, ...addressDto},
      });
    }

    return profile
  }

  async remove(id: number) {
    return this.prisma.profile.delete({ where: { userId:id } });
  }
}
