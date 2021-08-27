import { Logger, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';

export const appProviders: Provider[] = [
  {
    provide: 'queryRunner',
    useFactory: async (connection: Connection) => {
      Logger.debug({ message: 'Preparing QueryRunner' });
      const qr = connection.createQueryRunner();
      await qr.connect();
      return qr;
    },
    inject: [Connection],
  },
];
