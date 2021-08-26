import { Body, Controller, Get, Post, Put } from '@nestjs/common';
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
  async getItems(): Promise<ItemDto[]> {
    return this.appService.getItems();
  }

  @Post()
  async addItem(@Body() item: CreateItemDto): Promise<ItemDto> {
    return this.appService.addItem(item);
  }
}
