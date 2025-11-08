import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { TemplatesService } from '../templates/templates.service';
import { BufferedFile } from '../files/files.model';
import { FilesService } from '../files/files.service';
import { StaticCanvas } from 'fabric/node';
import { createCanvas } from 'canvas';

@Injectable()
export class ImagesService {
  constructor(private readonly templatesService: TemplatesService, private readonly filesService: FilesService) { }
  async create(createImageDto: CreateImageDto) {
    try {

      const template = await this.templatesService.findOne(createImageDto.templateName);

      let templateJson = JSON.parse(template.json);

      let imageJson = JSON.parse(JSON.stringify(createImageDto.values));
      imageJson.forEach((obj) => {

        const target = templateJson.objects.find((t) => t.name === obj.name);
        if (target) {
          console.log("Merging object:", obj.name);
          Object.assign(target, obj);
        }

      });
      const buffer = await this.createImageBuffer(JSON.stringify(templateJson));
      const fileToUpload: BufferedFile = {
        buffer: buffer,
        mimetype: 'image/png',
        originalname: `template-${Date.now()}.png`,
        fieldname: 'file',
        encoding: '7bit',
        size: buffer.length,
      };
      const uploadResult = await this.filesService.uploadFile(fileToUpload, 'images');

      return uploadResult;
    } catch (error) {
      console.log(error);
      if (error.getStatus) throw error;
      throw new InternalServerErrorException('Failed to create image');
    }
  }
  async createImageBuffer(canvasJson: string): Promise<Buffer> {

    try {

      const canvasData = JSON.parse(canvasJson);


      const width = canvasData.width || 800;
      const height = canvasData.height || 600;



      const canvas = new StaticCanvas(undefined, { width, height });



      await canvas.loadFromJSON(canvasData).then(() => canvas.renderAll());
      console.log(canvas.getObjects());

      const buffer = canvas.toDataURL();
      const base64Data = buffer.replace(/^data:image\/\w+;base64,/, '');
      const bufferData = Buffer.from(base64Data, 'base64');
      return bufferData;


    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create image buffer');
    }
  }
  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

}
