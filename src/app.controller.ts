import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Item } from './item.entity';
import { AppService } from './app.service';

@Controller('items')
export class AppController {
  constructor(
    private readonly connection: Connection,
    private readonly appService: AppService,
  ) {}

  @Get()
  async getItems(): Promise<Item[]> {
    return this.appService.getItems();
  }

  @Post()
  async addItem(@Body() item: Item): Promise<Item> {
    return this.appService.addItem(item);
  }
}
