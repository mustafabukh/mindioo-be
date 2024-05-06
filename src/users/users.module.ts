import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, ProfilesModule],
  exports: [UsersService],
})
export class UsersModule {}
