import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signin(userid: string, password: string) {
    const user = await this.usersService.findById(userid);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
