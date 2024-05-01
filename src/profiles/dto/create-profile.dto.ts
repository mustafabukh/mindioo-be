import { ApiProperty } from '@nestjs/swagger';
import { isDate,IsDateString,isDateString,IsOptional, IsString, MinLength } from 'class-validator';
import { Gender, User } from '@prisma/client'; // Import UserType from Prisma

class AddressDto {
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
}

class LinksDto {
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
}

export class CreateProfileDto {
  @ApiProperty()
  userId: number;

  // @ApiProperty()
  // user: User;

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

  // @ApiProperty()
  // @IsOptional()
  // address?: AddressDto; // Address DTO

  // @ApiProperty()
  // @IsOptional()
  // socialMedia?: LinksDto; // Links DTO 
}