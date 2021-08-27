import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  @Exclude()
  updated: string;

  @Column()
  name: string;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}
