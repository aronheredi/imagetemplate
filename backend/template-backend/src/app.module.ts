import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplatesModule } from './templates/templates.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinioModule } from './minio/minio.module';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes .env variables available globally
    envFilePath: '.env',
  }),


  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),

      autoLoadEntities: true,

      // IMPORTANT: Set to 'false' in production!
      // This syncs your database schema with your entities on every run.
      // Good for dev, but dangerous in production.
      synchronize: true,
    }),
  }), TemplatesModule, ImagesModule, MinioModule, FilesModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, FilesService],
})
export class AppModule { }
