import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { versions } from 'process';
import { RolesGuard } from 'src/auth/role.guard';
import { UserType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UsersFilter } from 'src/utils/filters';

@Controller({
  version: versions.V1,
  path: 'posts',
})
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() request: any
    ) {
    const userId = request.user.id;
    return this.postsService.create(createPostDto,userId);
  }

  @Post('getAll')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getAll(
    // @Body() usersFilter: UsersFilter,
  ) {
    return this.postsService.findAll();
  }


  // TODO ADD FILTERS&PAGINATION
  @Get('getAllByUserID:userId')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getAllByUserID(
    @Param('userId', ParseIntPipe) userId: number
    ) {
    return this.postsService.getAllByUserId(userId);
  }

  @Get('getOneById:id')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getOneById(
    @Param('id', ParseIntPipe) id: number
    ) {
    return this.postsService.getOneById(id);
  }

  @Get('getMyPosts')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getMyProfile(
    @Req() request: any
    ) {
      const userId = request.user.id;
      return this.postsService.getAllByUserId(userId);
  }

  @Patch('updatePost:postId')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Body() updatePostDto: UpdatePostDto,
    @Req() request: any,
    @Param('postId', ParseIntPipe) postId: number
    ) {
      const userId = request.user.id;
      return this.postsService.update(userId, postId, updatePostDto);
  }

  @Delete(':postId')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN,UserType.VENDOR,UserType.VENDOR)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(
    @Req() request: any,
    @Param('postId', new ParseIntPipe()) postId: number
  ) {
    const userId = request.user.id;
    return this.postsService.remove(userId, postId);
  }

  @Get('getGenders')
  getGenders() {
    return this.postsService.getPostTypes();
  }
}
