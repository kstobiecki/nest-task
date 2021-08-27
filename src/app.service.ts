import { Inject, Injectable, Logger } from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { CreateItemDto, ItemDto } from './dto';
import { plainToClass } from 'class-transformer';
import { ItemEntity } from './entity/item.entity';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

@Injectable()
export class AppService {
  constructor(@Inject('queryRunner') private readonly qr: QueryRunner) {}

  public async getItems(): Promise<ItemDto[]> {
    Logger.debug({ message: '[getItems] Searching for items' });
    const repo = this.qr.manager.getCustomRepository(ItemRepository);
    const items = await repo.find();
    Logger.debug({ message: '[getItems] Returning items', data: items });
    return items;
  }

  public async addItem(item: CreateItemDto): Promise<ItemDto> {
    Logger.debug({ message: `[addItem] Adding an item ${item}` });
    const repo = this.qr.manager.getCustomRepository(ItemRepository);
    const savedItem = await repo.save(item);

    Logger.debug({
      message: '[addItem] Returning saved entity',
      data: savedItem,
    });
    return plainToClass(ItemEntity, savedItem);
  }

  public async deleteItem(itemId: string): Promise<void> {
    Logger.debug({
      message: `[deleteItem] Deleting an item with id ${itemId}`,
    });
    const repo = this.qr.manager.getCustomRepository(ItemRepository);
    await repo.softDelete(itemId);
  }

  public async restoreItem(itemId: string): Promise<void> {
    Logger.debug({
      message: `[restoreItem] Restoring an item with id ${itemId}`,
    });
    const repo = this.qr.manager.getCustomRepository(ItemRepository);
    await repo.restore(itemId);
  }
}
