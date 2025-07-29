import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto.userId, signInDto.password);
  }
}
