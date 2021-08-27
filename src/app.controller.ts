import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppService } from './app.service';
import { CreateItemDto, ItemDto } from './dto';

@Controller({
  version: '1',
  path: 'items',
})
export class AppController {
  constructor(
    private readonly connection: Connection,
    private readonly appService: AppService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getItems(): Promise<ItemDto[]> {
    Logger.debug({ message: '[getItems] Requested for all items' });
    return this.appService.getItems();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addItem(@Body() item: CreateItemDto): Promise<ItemDto> {
    Logger.debug({ message: '[addItem] Requested to add an item' });
    return this.appService.addItem(item);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItem(@Param('id') itemId: string): Promise<void> {
    Logger.debug({
      message: `[deleteItem] Requested to delete an item with id ${itemId}`,
    });
    return this.appService.deleteItem(itemId);
  }

  @Post('/restore/:id')
  @HttpCode(HttpStatus.OK)
  async restoreItem(@Param('id') itemId: string): Promise<void> {
    Logger.debug({
      message: `[restoreItem] Requested to restore an item with id ${itemId}`,
    });
    return this.appService.restoreItem(itemId);
  }
}
