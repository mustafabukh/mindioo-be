import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,

} from 'class-validator'

export class CreateUserDto {
  // TODO == validations
  // TODO == Error handling == https://nestjs-prisma.dev/docs/basic-usage/
  
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  // @ApiProperty()
  // userType: string;
}
