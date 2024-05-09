import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, ProfilesModule, PostsModule],
  controllers: [AppController],
  providers: [AppService,
    providePrismaClientExceptionFilter({
      // Prisma Error Code: HTTP Status Response
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    })
  ],
})
export class AppModule {}
