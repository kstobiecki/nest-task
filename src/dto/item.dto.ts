import { IsDate, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsDate()
  @ApiProperty()
  created: Date;

  @IsString()
  @ApiProperty()
  name: string;
}
