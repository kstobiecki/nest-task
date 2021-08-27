import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { CreateItemDto, ItemDto } from './dto';
import { plainToClass } from 'class-transformer';
import { ItemEntity } from './entity/item.entity';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { ErrorMessageEnum } from './enums/error-message.enum';
import { QUERY_RUNNER } from './app.tokens';
import { handleErrorHelper } from './helpers/handle-error.helper';

@Injectable()
export class AppService {
  constructor(@Inject(QUERY_RUNNER) private readonly qr: QueryRunner) {}

  public async getItems(): Promise<ItemDto[]> {
    try {
      Logger.debug({ message: '[getItems] Searching for items' });
      const repo = this.qr.manager.getCustomRepository(ItemRepository);
      const items = await repo.find();
      Logger.debug({ message: '[getItems] Returning items', data: items });
      return items;
    } catch (error: any) {
      Logger.debug({ message: `[getItems - error] items not found` });
      handleErrorHelper(error);
    }
  }

  public async addItem(item: CreateItemDto): Promise<ItemDto> {
    try {
      Logger.debug({ message: `[addItem] Adding an item ${item}` });
      const repo = this.qr.manager.getCustomRepository(ItemRepository);
      const savedItem = await repo.save(item);

      Logger.debug({
        message: '[addItem] Returning saved entity',
        data: savedItem,
      });
      return plainToClass(ItemEntity, savedItem);
    } catch (error: any) {
      Logger.debug({ message: `[addItem - error] item was not created` });
      handleErrorHelper(error);
    }
  }

  public async deleteItem(itemId: string): Promise<void> {
    try {
      Logger.debug({
        message: `[deleteItem] Deleting an item with id ${itemId}`,
      });
      const repo = this.qr.manager.getCustomRepository(ItemRepository);
      const itemToDelete = await repo.findOne(itemId);
      if (!itemToDelete) {
        Logger.debug({
          message: `[deleteItem - error] item with id ${itemId} was not deleted`,
        });
        throw {
          statusCode: HttpStatus.NOT_FOUND,
          name: 'Item was not found',
          message: ErrorMessageEnum.ITEM_NOT_DELETED,
        };
      }
      await repo.softDelete(itemId);
    } catch (error: any) {
      Logger.debug({
        message: `[deleteItem - error] item with id ${itemId} was not deleted`,
      });
      handleErrorHelper(error);
    }
  }

  public async restoreItem(itemId: string): Promise<void> {
    try {
      Logger.debug({
        message: `[restoreItem] Restoring an item with id ${itemId}`,
      });
      const repo = this.qr.manager.getCustomRepository(ItemRepository);
      await repo.restore(itemId);
      const itemToRestore = await repo.findOne(itemId);
      if (!itemToRestore) {
        Logger.debug({
          message: `[restoreItem - error] item with id ${itemId} was not restored`,
        });
        throw {
          statusCode: HttpStatus.NOT_FOUND,
          name: 'Item was not found',
          message: ErrorMessageEnum.ITEM_NOT_RESTORED,
        };
      }
    } catch (error: any) {
      Logger.debug({
        message: `[restoreItem - error] item with id ${itemId} was not restored`,
      });
      handleErrorHelper(error);
    }
  }
}
