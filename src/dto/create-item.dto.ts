import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
