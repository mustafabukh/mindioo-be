import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { postsType } from 'src/utils/mapEnums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: number) {

    createPostDto.authorId = userId
    const post = await this.prisma.post.create({
      data:createPostDto,
    });
    console.log(post);
    return post
  }

  async findAll() {
    return this.prisma.profile.findMany();
  }

  async getAllByUserId(id: number) {
    return this.prisma.post.findMany({ where: { authorId:id } });
  }

  async getOneById(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(userId: number, postId:number, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.update({
      where: {id: postId, authorId:userId },
      data: updatePostDto,
    });
    return post
  }

  async remove(userId: number, postId: number) {
    console.log({id: postId, authorId:userId })

    const post = await this.prisma.post.delete({
      where: {id: postId, authorId:userId },
    });
    return post
  }

  getPostTypes() {
    return postsType
  }
}
