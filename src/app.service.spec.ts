import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { ItemDto } from './dto';
import { appProviders } from './app.providers';
import { Connection } from 'typeorm';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

describe('AppService', () => {
  let appService: AppService;
  let connection: Connection;

  const repositoryMockFactory = () => ({
    find: jest.fn(() => [ItemMock]),
    findOne: jest.fn(),
    restore: jest.fn(),
  });

  const qr = {
    manager: { getCustomRepository: repositoryMockFactory },
  } as unknown as QueryRunner;

  const mockConnection = () => ({
    transaction: jest.fn(),
    createQueryRunner(): QueryRunner {
      return qr;
    },
  });

  beforeEach(async () => {
    qr.connect = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        AppService,
        ...appProviders,
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    connection = await module.get<Connection>(Connection);
  });

  describe('getItems', () => {
    it('should return all items', async () => {
      const result = await appService.getItems();
      expect(result).toEqual([ItemMock]);
    });
  });

  describe('deleteItems', () => {
    it('should not delete item and throw an error', async () => {
      await expect(
        async () => await appService.deleteItem('someId'),
      ).rejects.toThrow();
    });
  });
});

const ItemMock = {
  id: 'someId',
  created: new Date(),
  name: 'someName',
} as ItemDto;
