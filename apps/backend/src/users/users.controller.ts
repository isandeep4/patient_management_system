import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Public()
  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get(":userId")
  @HttpCode(200)
  async findUserById(
    @Param("userId") userId: string
  ): Promise<User | undefined> {
    return this.usersService.findById(userId);
  }

  @Get()
  @HttpCode(200)
  @Roles(Role.Admin)
  async fetchAllUsers(): Promise<User[]> {
    return this.usersService.fetchAll();
  }
}
