import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { LangueCode } from 'src/common/enums/status.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  nom!: string;

  @IsString()
  @MinLength(2)
  prenom!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  motDePasse!: string;

  @IsOptional()
  @IsEnum(LangueCode)
  languePreferee?: LangueCode;
}
