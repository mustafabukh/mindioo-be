import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "@prisma/client";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,

} from 'class-validator'

export class CreateUserDto {
  // TODO == Error handling == https://nestjs-prisma.dev/docs/basic-usage/

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  password: string;

  @ApiProperty()
  userType: UserType;
  
}
