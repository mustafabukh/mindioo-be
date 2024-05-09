import { Controller,
         Get,
         Post, 
         Body, 
         Patch, 
         Param, 
         Delete,  
         UseGuards, 
         ParseIntPipe,
         NotFoundException,
         Req,
        } from '@nestjs/common';


import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserType } from '@prisma/client';
import { RolesGuard } from 'src/auth/role.guard';
import { versions } from 'src/utils/versioning'

@Controller({
  version: versions.V1,
  path: 'users',
})
@ApiTags(`users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createCustomer')
  @ApiCreatedResponse({ type: UserEntity })
  createCustomer(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto, UserType.CUSTOMER);
  }

  @Post("createVendor")
  @ApiCreatedResponse({ type: UserEntity })
  createVendor(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto, UserType.VENDOR);
  }

  @Get('getAll')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('getById:id')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User does not exist.`);
    }

    return user;
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: any
    ) {
    console.log(request)
    const userId = request.user.id;
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(
    @Req() request: any
    ) {
    const userId = request.user.id;
    return this.usersService.remove(userId);
  }

  @Get('getCategories')
  getCategories() {
    return this.usersService.getCategories();
  }

  @Get('getGenders')
  getGenders() {
    return this.usersService.getGenders();
  }
}
