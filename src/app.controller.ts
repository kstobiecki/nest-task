import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { AppService } from './app.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class AppController {
  constructor(
    private readonly connection: Connection,
    private readonly appService: AppService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK.valueOf())
  async getItems(): Promise<ItemDto[]> {
    Logger.debug({ message: '[getItems] Requested for all items' });
    return this.appService.getItems();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED.valueOf())
  async addItem(@Body() item: CreateItemDto): Promise<ItemDto> {
    Logger.debug({ message: 'Requested to add item' });
    return this.appService.addItem(item);
  }
}
