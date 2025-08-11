import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Public } from "./decorators/public.decorator";
import { Response } from "express";
import { CreateUserDto } from "src/users/dto/create-user.dto";

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
    try {
      const { access_token, userDetails } = await this.authService.signin(
        signInDto.userId,
        signInDto.password
      );
      // Set token in HttpOnly cookie
      res.cookie("accessToken", access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: "/",
        domain: "https://patient-management-system-1xbl.vercel.app",
      });
      // return res.send({
      //   message: "logged in",
      //   // userId: userDetails.userId,
      //   // userName: userDetails.userNmae,
      //   // roles: userDetails.roles,
      // });
      return {
        message: "logged in",
        user: userDetails,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error; // will return 401 with original message
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException("Login failed.");
    }
  }
  @Public()
  @Post("signup")
  @HttpCode(201)
  async signup(@Body() signupDto: CreateUserDto, @Res() res: Response) {
    try {
      const { token, user } = await this.authService.signup(signupDto);
      if (!user) {
        throw new BadRequestException("Invalid user data");
      }
      //set HTTP-only cookie
      res.cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: 15 * 60 * 1000,
        domain: "https://patient-management-system-1xbl.vercel.app",
      });
      return res.send({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async singout(@Res() res: Response) {
    //clear cookie
    res.clearCookie("accessToken", {
      path: "/",
    });
    return res.json({ message: "logged out" });
  }
}
