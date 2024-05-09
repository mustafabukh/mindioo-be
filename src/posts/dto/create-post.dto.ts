import { ApiProperty } from '@nestjs/swagger';
import { isDate,IsDateString,isDateString,IsOptional, IsString, MinLength } from 'class-validator';
import { Gender, User } from '@prisma/client'; // Import UserType from Prisma


export class CreatePostDto {
  // @ApiProperty({ required: false })
  // postType: PostType;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(10)
  description?: string;

  @ApiProperty({ required: false })
  media: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @ApiProperty({ required: false })
  authorId?: number;
}
