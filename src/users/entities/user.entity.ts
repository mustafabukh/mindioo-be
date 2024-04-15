import { User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

// TODO == finalize
export class UserEntity {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}