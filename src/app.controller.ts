import { Controller, Get, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';

@Controller('items')
export class AppController {
  constructor(
    private readonly connection: Connection
  ) {}

  @Get()
  async getItems(): Promise<Item[]> {
    Logger.debug({ message: 'Requested for all items! Preparing QueryRunner' });
    const qr = this.connection.createQueryRunner();
    await qr.connect();

    Logger.debug({ message: 'Connection established, searching for items' });
    const repo = qr.manager.getCustomRepository(ItemRepository);
    const items = await repo.find();

    Logger.debug({ message: 'Returning items', data: items });
    return items;
  }
}
