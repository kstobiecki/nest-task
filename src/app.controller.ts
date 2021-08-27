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
    Logger.debug({ message: 'Requested to add an item' });
    return this.appService.addItem(item);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT.valueOf())
  async deleteItem(@Param('id') itemId: string): Promise<void> {
    Logger.debug({ message: `Requested to delete an item ${itemId}` });
    return this.appService.deleteItem(itemId);
  }

  @Post('/restore/:id')
  @HttpCode(HttpStatus.OK.valueOf())
  async restoreItem(@Param('id') itemId: string): Promise<void> {
    Logger.debug({ message: `Requested to restore an item ${itemId}` });
    return this.appService.retoreItem(itemId);
  }
}
