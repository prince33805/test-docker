import { IsEmail, Length } from "class-validator";

// DTO + Pipe validation
export class CreateUserDto {
  @IsEmail()
  email: string;

  @Length(6, 20)
  password: string;
}
