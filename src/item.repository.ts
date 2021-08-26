import { Repository, EntityRepository } from 'typeorm';
import { ItemEntity } from './entity/item.entity';

@EntityRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity> {}
