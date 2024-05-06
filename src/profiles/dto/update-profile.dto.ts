import { ApiProperty } from '@nestjs/swagger';
import { AddressDto, SocialMediaDto } from './create-profile.dto';
import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';
import { Gender } from '@prisma/client';

class BasicProfileDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(3)
  lastName: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(10)
  bio: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coverPhoto?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @ApiProperty()
  @IsOptional()
  gender?: Gender; 
}

export class UpdateFullProfileDto {

  @ApiProperty()
  @IsOptional()
  basicProfileDto?: BasicProfileDto

  @ApiProperty()
  @IsOptional()
  address?: AddressDto; // Address DTO

  @ApiProperty()
  @IsOptional()
  socialMedia?: SocialMediaDto; // Links DTO 
}
