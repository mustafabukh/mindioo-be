import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserType } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;
  
  const mockUserService = {
    create: jest.fn((dto : CreateUserDto) =>{
      return {
        name : dto.name,
        email : dto.email,
      }
    })
  }

  const validUserdto : CreateUserDto = {
    email:"email@email.com",
    name:"email@email.com",
    password:"email@email.com",
    categories:["HEALER"],
    userType:"VENDOR",
  }
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService).useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createUser with vendor data', () => {
    expect(controller.createVendor(validUserdto)).toEqual( {
      name : validUserdto.name,
      email : validUserdto.email,
    })

    expect(mockUserService.create).toHaveBeenCalledWith(validUserdto, UserType.VENDOR)

  });

});
 