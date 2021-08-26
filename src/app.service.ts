import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class AppService {
  constructor(private readonly connection: Connection) {}

  public async getItems(): Promise<Item[]> {
    Logger.debug({ message: 'Requested for all items! Preparing QueryRunner' });
    const qr = this.connection.createQueryRunner();
    await qr.connect();

    Logger.debug({ message: 'Connection established, searching for items' });
    const repo = qr.manager.getCustomRepository(ItemRepository);
    const items = await repo.find();

    Logger.debug({ message: 'Returning items', data: items });
    return items;
  }

  public async addItem(item: Item): Promise<Item> {
    Logger.debug({ message: 'Requested to add item! Preparing QueryRunner' });
    const qr = this.connection.createQueryRunner();
    await qr.connect();

    Logger.debug({ message: 'Connection established, adding an item' });
    const repo = qr.manager.getCustomRepository(ItemRepository);
    const savedItem = await repo.save(item);

    Logger.debug({ message: 'Returning saved entity', data: item });
    return savedItem;
  }
}
