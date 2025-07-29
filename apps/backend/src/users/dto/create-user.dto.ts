import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  userId: string;
  @IsString()
  userName: string;
  @IsString()
  password: string;
}
