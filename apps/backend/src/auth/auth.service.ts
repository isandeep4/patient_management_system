import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signin(userid: string, password: string) {
    const user = await this.usersService.findById(userid);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userDetails: user,
    };
  }
  async signup(
    userData: CreateUserDto
  ): Promise<{ user: User; token: string }> {
    const existingUser = await this.usersService.findById(userData.userId);
    if (existingUser) {
      throw new ConflictException("User with this username already exists");
    }
    const user = await this.usersService.create(userData);
    const payload = { sub: user.userId, roles: user.roles };
    return {
      token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}
