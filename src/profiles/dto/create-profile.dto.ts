import { ApiProperty } from '@nestjs/swagger';
import { isDate,IsDateString,isDateString,IsOptional, IsString, MinLength } from 'class-validator';
import { Gender, User } from '@prisma/client'; // Import UserType from Prisma

export class AddressDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  postalCode?: string;

  constructor() {
    this.street = null
    this.city = null
    this.state = null
    this.country = null
    this.postalCode = null
  }
}

export class SocialMediaDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  youtube?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  instagram?: string;

  constructor() {
    this.facebook = null
    this.youtube = null
    this.twitter = null
    this.instagram = null
  }
}

export class BasicProfileDto {
  @ApiProperty()
  userId: number;

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

  constructor() {
    this.userId = null
    this.firstName = null
    this.lastName = 
    this.bio = null
    this.birthdate = null;
    this.coverPhoto = null
    this.profilePhoto = null
    this.gender = null
  }
}

export class CreateFullProfileDto {
  @ApiProperty()
  @IsOptional()
  basicProfileDto: BasicProfileDto

  @ApiProperty()
  @IsOptional()
  address?: AddressDto; // Address DTO

  @ApiProperty()
  @IsOptional()
  socialMedia?: SocialMediaDto; // Links DTO 

  constructor() {
    this.basicProfileDto = new BasicProfileDto()
    this.address = new AddressDto()
    this.socialMedia = new SocialMediaDto()
  }
}