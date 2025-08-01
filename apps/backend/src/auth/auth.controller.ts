import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Public } from "./decorators/public.decorator";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { access_token } = await this.authService.signin(
      signInDto.userId,
      signInDto.password
    );
    //set HTTP-only cookie
    res.cookie("accessToken", access_token, {
      httpOnly: true,
      secure: false, // Use HTTPS in production
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    return { message: "logged in" };
  }
}
