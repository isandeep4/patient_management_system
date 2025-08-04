import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
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
      return {
        message: "logged in",
        user: userDetails,
        accessToken: access_token,
      };
    } catch (error) {
      console.error("Error during login:", error);
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
      // res.cookie("accessToken", token, {
      //   httpOnly: true,
      //   sameSite: "none",
      //   secure: true,
      //   path: "/",
      //   maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      // });
      return res.status(201).json({
        message: "User registered successfully",
        user,
        accessToken: token,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async singout(@Res() res: Response) {
    //clear cookie
    // res.clearCookie("accessToken", {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    //   path: "/",
    // });
    return res.status(200).json({ message: "logged out" });
  }
}
