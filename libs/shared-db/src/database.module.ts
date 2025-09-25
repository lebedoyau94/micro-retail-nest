import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.DB_TYPE as 'postgres' | 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER || 'user',
        password: process.env.DB_PASS || 'pass',
        database: process.env.DB_NAME || 'testdb',
        autoLoadEntities: true,
        synchronize: true, // ⚠️ solo dev
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
