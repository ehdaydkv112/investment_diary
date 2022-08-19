import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

class UserValidator {
  constructor(userEmail: string, userPassword: string) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsString()
  @Length(5, 15)
  @IsNotEmpty()
  userPassword: string;
}

export = UserValidator;
