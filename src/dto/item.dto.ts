import { IsDate, IsString, IsUUID } from 'class-validator';

export class ItemDto {
  @IsUUID()
  id: string;

  @IsDate()
  created: string;

  @IsString()
  name: string;
}
