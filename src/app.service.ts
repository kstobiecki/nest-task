import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ItemRepository } from './item.repository';
import { CreateItemDto, ItemDto } from './dto';

@Injectable()
export class AppService {
  constructor(private readonly connection: Connection) {}

  public async getItems(): Promise<ItemDto[]> {
    Logger.debug({ message: 'Preparing QueryRunner' });
    const qr = this.connection.createQueryRunner();
    await qr.connect();

    Logger.debug({ message: 'Connection established, searching for items' });
    const repo = qr.manager.getCustomRepository(ItemRepository);
    const items = await repo.find();
    Logger.debug({ message: 'Returning items', data: items });
    return items;
  }

  public async addItem(item: CreateItemDto): Promise<ItemDto> {
    Logger.debug({ message: 'Preparing QueryRunner' });
    const qr = this.connection.createQueryRunner();
    await qr.connect();

    Logger.debug({ message: 'Connection established, adding an item' });
    const repo = qr.manager.getCustomRepository(ItemRepository);
    const savedItem = await repo.save(item);

    Logger.debug({ message: 'Returning saved entity', data: savedItem });
    return savedItem;
  }

  public async deleteItem(itemId: string): Promise<void> {
    Logger.debug({ message: 'Preparing QueryRunner' });
    const qr = this.connection.createQueryRunner();
    await qr.connect();

    Logger.debug({ message: 'Connection established, deleting an item' });
    const repo = qr.manager.getCustomRepository(ItemRepository);
    await repo.softDelete(itemId);
  }

  public async retoreItem(itemId: string): Promise<void> {
    Logger.debug({ message: 'Preparing QueryRunner' });
    const qr = this.connection.createQueryRunner();
    await qr.connect();

    Logger.debug({ message: 'Connection established, deleting an item' });
    const repo = qr.manager.getCustomRepository(ItemRepository);
    await repo.restore(itemId);
  }
}
