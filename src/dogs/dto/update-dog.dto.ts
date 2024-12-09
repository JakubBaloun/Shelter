import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateDogDto {
  //   @IsOptional()
  //   @IsString()
  //   name?: string;

  //   @IsOptional()
  //   @IsNumber()
  //   age?: number;

  //   @IsOptional()
  //   @IsString()
  //   breed?: string;

  @IsOptional()
  @IsBoolean()
  adoptable?: boolean;
}
