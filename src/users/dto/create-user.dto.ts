import { IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  //Change to IsStrongPassword
  @IsString()
  password: boolean;
}
