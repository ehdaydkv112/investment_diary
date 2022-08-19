import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

class EmailValidator {
  constructor(userEmail: string) {
    this.userEmail = userEmail;
  }

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;
}

export = EmailValidator;
