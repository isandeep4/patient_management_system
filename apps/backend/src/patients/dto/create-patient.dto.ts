import { Type } from "class-transformer";
import { IsDate, IsEmail, IsInt, IsString } from "class-validator";

export class CreatePatientDto {
  @IsInt()
  id: number;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  phoneNumber: string;
  @Type(() => Date)
  @IsDate()
  dob: Date;
}
