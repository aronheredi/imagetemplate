import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TemplatesModule } from '../templates/templates.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TemplatesModule, FilesModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule { }
