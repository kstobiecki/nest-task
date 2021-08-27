import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
