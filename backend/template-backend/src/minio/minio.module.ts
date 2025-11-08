import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Minio from 'minio';


export const MINIO_CLIENT = 'MINIO_CLIENT';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: MINIO_CLIENT,

            useFactory: (configService: ConfigService) => {
                return new Minio.Client({
                    endPoint: configService.get('MINIO_ENDPOINT') || 'localhost',
                    port: +configService.get('MINIO_PORT'),
                    useSSL: configService.get('MINIO_USE_SSL') === 'true',
                    accessKey: configService.get('MINIO_ACCESS_KEY'),
                    secretKey: configService.get('MINIO_SECRET_KEY'),
                });
            },
            inject: [ConfigService],
        },
    ],

    exports: [MINIO_CLIENT],
})
export class MinioModule { }