import { Logger, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { QUERY_RUNNER } from './app.tokens';

export const appProviders: Provider[] = [
  {
    provide: QUERY_RUNNER,
    useFactory: async (connection: Connection) => {
      Logger.debug({ message: 'Preparing QueryRunner' });
      const qr = connection.createQueryRunner();
      await qr.connect();
      return qr;
    },
    inject: [Connection],
  },
];
