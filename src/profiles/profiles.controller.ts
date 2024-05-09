import { Controller,
         UseGuards,
         Get,
         Post,
         Body, 
         Patch, 
         Param, 
         Delete, 
         Req 
        } from '@nestjs/common';

import { ProfilesService } from './profiles.service';
import { CreateFullProfileDto } from './dto/create-profile.dto';
import { UpdateFullProfileDto } from './dto/update-profile.dto';
import { versions } from 'src/utils/versioning';
import { UserType } from '@prisma/client';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { UsersFilter } from 'src/utils/filters';

@Controller({
  version: versions.V1,
  path: 'profiles',
})
@ApiTags(`profiles`)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @Body() profileDto: CreateFullProfileDto,
    @Req() request: any
    ) {
    const userId = request.user.id;
    return this.profilesService.create(profileDto,userId);
  }

  // TODO Get with pagination
  // TODO ADD STATISTICS
  // UNIFY RESPONSES
  // more error handling 
  @Post('getAll')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getAll(
    @Body() usersFilter: UsersFilter,
  ) {
    return this.profilesService.findAllWithfilter(usersFilter);
  }

  @Get('getByID:userId')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getByID(
    @Param('userId') id: string
    ) {
    return this.profilesService.findOne(+id);
  }

  @Get('getMyProfile')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getMyProfile(
    @Req() request: any
    ) {
      const userId = request.user.id;
    return this.profilesService.findOne(userId);
  }

  @Patch('updateProfile')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Body() updateFullProfileDto: UpdateFullProfileDto,
    @Req() request: any
    ) {
      const userId = request.user.id;
      return this.profilesService.update(userId, updateFullProfileDto);
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.VENDOR)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(
    @Req() request: any
  ) {
    const userId = request.user.id;
    return this.profilesService.remove(userId);
  }
}
