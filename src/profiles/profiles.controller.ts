import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateFullProfileDto } from './dto/create-profile.dto';
import { UpdateFullProfileDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { versions } from 'src/utils/versioning';

@Controller({
  version: versions.V1,
  path: 'profiles',
})
@ApiTags(`profiles`)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() profileDto: CreateFullProfileDto) {
    return this.profilesService.create(profileDto);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch()
  update(
    @Body() updateFullProfileDto: UpdateFullProfileDto,
    @Req() request: any
    ) {
      const userId = request.user.id;
      return this.profilesService.update(userId, updateFullProfileDto);
  }

  @Delete()
  remove(
    @Req() request: any
  ) {
    const userId = request.user.id;
    return this.profilesService.remove(userId);
  }
}
