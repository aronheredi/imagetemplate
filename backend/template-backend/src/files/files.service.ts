import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MINIO_CLIENT } from '../minio/minio.module';
import * as Minio from 'minio';
import { BufferedFile } from './files.model';
@Injectable()
export class FilesService {
    private readonly logger = new Logger(FilesService.name);
    private readonly defaultBucket: string;

    constructor(
        @Inject(MINIO_CLIENT) private readonly minioClient: Minio.Client,
        private readonly configService: ConfigService,
    ) {
        this.defaultBucket = this.configService.get<string>('MINIO_BUCKET') ?? '';
    }
    public async uploadFile(file: BufferedFile, bucket: string = this.defaultBucket): Promise<{ url: string }> {
        await this.ensureBucketExists(bucket);
        const metaData = { 'Content-Type': file.mimetype };
        const fileName = `${Date.now()}-${file.originalname}`;

        try {
            await this.minioClient.putObject(bucket, fileName, file.buffer, file.buffer.length, metaData);
            this.logger.log(`Successfully uploaded ${fileName} to ${bucket}`);


            return {
                url: `http://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${bucket}/${fileName}`,
            };
        } catch (error) {
            this.logger.error(`Failed to upload ${fileName}`, error);
            throw new Error('File upload failed');
        }
    }
    private async ensureBucketExists(bucketName: string) {
        const bucketExists = await this.minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            try {
                await this.minioClient.makeBucket(bucketName);
                this.logger.log(`Created bucket: ${bucketName}`);
            } catch (err) {
                this.logger.error(`Error creating bucket: ${bucketName}`, err);
                throw err;
            }
        }
    }
}
