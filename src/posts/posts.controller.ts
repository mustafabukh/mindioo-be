import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { versions } from 'process';

@Controller({
  version: versions.V1,
  path: 'posts',
})
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() request: any
    ) {
      const userId = request.user.id;
      return this.postsService.create(createPostDto,userId);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch()
  update(
    @Body() updatePostDto: UpdatePostDto,
    @Req() request: any
    ) {
      const userId = request.user.id;
      return this.postsService.update(userId, updatePostDto);
  }

  @Delete()
  remove(
    @Req() request: any
  ) {
    const userId = request.user.id;
    return this.postsService.remove(userId);
  }
}
