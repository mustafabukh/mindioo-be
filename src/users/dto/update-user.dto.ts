import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// TODO == ONLY UPDATABLES
export class UpdateUserDto extends PartialType(CreateUserDto) {}