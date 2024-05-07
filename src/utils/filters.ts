import { ApiProperty } from "@nestjs/swagger";
import { Gender, UserType, VendorCategory } from "@prisma/client";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,

} from 'class-validator'

export class UsersFilter {
  // TODO ==

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  gender: Gender;

  @ApiProperty()
  @IsOptional()
  categories: VendorCategory[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  state: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;
}