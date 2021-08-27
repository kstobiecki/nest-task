import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { CreateItemDto, ItemDto } from './dto';
import { plainToClass } from 'class-transformer';
import { ItemEntity } from './entity/item.entity';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { ErrorMessageEnum } from './enums/error-message.enum';

@Injectable()
export class AppService {
  constructor(@Inject('queryRunner') private readonly qr: QueryRunner) {}

  public async getItems(): Promise<ItemDto[]> {
    try {
      Logger.debug({ message: '[getItems] Searching for items' });
      const repo = this.qr.manager.getCustomRepository(ItemRepository);
      const items = await repo.find();
      Logger.debug({ message: '[getItems] Returning items', data: items });
      return items;
    } catch (error: unknown) {
      Logger.debug({ message: `[getItems - error] items not found` });
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error,
        message: ErrorMessageEnum.ITEM_NOT_FOUND,
      });
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
    } catch (error: unknown) {
      Logger.debug({ message: `[addItem - error] item was not created` });
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        error,
        message: ErrorMessageEnum.ITEM_NOT_CREATED,
      });
    }
  }

  public async deleteItem(itemId: string): Promise<void> {
    try {
      Logger.debug({
        message: `[deleteItem] Deleting an item with id ${itemId}`,
      });
      const repo = this.qr.manager.getCustomRepository(ItemRepository);
      await repo.softDelete(itemId);
    } catch (error: unknown) {
      Logger.debug({
        message: `[deleteItem - error] item with id ${itemId} was not deleted`,
      });
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        error,
        message: ErrorMessageEnum.ITEM_NOT_DELETED,
      });
    }
  }

  public async restoreItem(itemId: string): Promise<void> {
    try {
      Logger.debug({
        message: `[restoreItem] Restoring an item with id ${itemId}`,
      });
      const repo = this.qr.manager.getCustomRepository(ItemRepository);
      await repo.restore(itemId);
    } catch (error: unknown) {
      Logger.debug({
        message: `[restoreItem - error] item with id ${itemId} was not restored`,
      });
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        error,
        message: ErrorMessageEnum.ITEM_NOT_RESTORED,
      });
    }
  }
}
