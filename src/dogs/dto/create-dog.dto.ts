import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateDogDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;

  @IsBoolean()
  adoptable: boolean;
}
