import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

class CertificateCode {
  constructor(userEmail: string, certificateCode: string) {
    this.userEmail = userEmail;
    this.certificateCode = certificateCode;
  }

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsString()
  @Length(1, 10)
  @IsNotEmpty()
  certificateCode: string;
}

export = CertificateCode;
