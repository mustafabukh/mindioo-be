import { ApiProperty } from '@nestjs/swagger';
import { isDate,IsDateString,isDateString,IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePostDto {

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(10)
  description?: string;

  @ApiProperty({ required: false })
  media: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

}
