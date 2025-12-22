import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { TemplatesService } from '../templates/templates.service';
import { BufferedFile } from '../files/files.model';
import { FilesService } from '../files/files.service';
import { FabricImage, StaticCanvas } from 'fabric/node';
import axios from 'axios';
import sharp from 'sharp';
@Injectable()
export class ImagesService {
  constructor(private readonly templatesService: TemplatesService, private readonly filesService: FilesService) { }
  //download image to prevent issues
  private async downloadToDataUrl(url: string): Promise<{
    dataUrl: string;
    width: number;
    height: number;
    contentType: string;
  }> {
    const res = await axios.get<ArrayBuffer>(url, {
      responseType: 'arraybuffer',
      maxRedirects: 5,
      timeout: 15000,
      headers: {
        'User-Agent': 'template-backend/1.0',
        Accept: 'image/*,*/*;q=0.8',
      },
      validateStatus: (s) => s >= 200 && s < 300,
    });

    const contentType = String(res.headers['content-type'] || '').toLowerCase();
    if (!contentType.startsWith('image/')) {
      throw new Error(`URL did not return an image. content-type=${contentType || 'unknown'} url=${url}`);
    }

    const buf = Buffer.from(res.data);
    const meta = await sharp(buf).metadata();
    if (!meta.width || !meta.height) {
      throw new Error(`Downloaded image has invalid dimensions. url=${url}`);
    }
    const base64 = buf.toString('base64');
    return {
      dataUrl: `data:${contentType};base64,${base64}`,
      width: meta.width,
      height: meta.height,
      contentType: contentType
    };
  }
  async create(createImageDto: CreateImageDto) {
    try {
      const template = await this.templatesService.findOne(createImageDto.templateId);

      let imageJson = JSON.parse(JSON.stringify(createImageDto.values));

      // Changed forEach to Promise.all + map to await async operations
      await Promise.all(imageJson.map(async (obj) => {

        const target = template.json.objects.find((t) => t.name === obj.name);
        if (target) {
          console.log(target.type);
          if (target.type === 'Image' && obj.src) {
            console.log('Loading image for', obj.name, 'from', obj.src);
            const { dataUrl, width, height } = await this.downloadToDataUrl(obj.src);
            console.log('Downloaded image', obj.name, 'size:', width, 'x', height, 'dataUrl:', dataUrl.substring(0, 30) + '...');
            obj.src = dataUrl;
            //recaulculate scaling so the image fits the original dimensions
            const oldWidth = target.width;
            const oldHeight = target.height;
            obj.width = width;
            obj.height = height;
            obj.scaleX = oldWidth / width;
            obj.scaleY = oldHeight / height;
            console.log('Modified object:', obj);

            Object.assign(target, obj)
            console.log('Updated target object:', target);
          } else {
            Object.assign(target, obj);
          }
        }

      }));
      console.log('Final image JSON:', template.json);
      const buffer = await this.createImageBuffer(JSON.stringify(template.json));
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
  async loadImage(img: FabricImage, src: string, id: string, name: string): Promise<FabricImage> {
    const newImg = await FabricImage.fromURL(src, {}, {
      left: img.left,
      top: img.top,
      angle: img.angle,
      width: img.width,
      height: img.height,
      scaleX: 0.5,
      scaleY: 0.5

    });
    newImg.set('id', id);
    newImg.set('name', name);

    return newImg;
  }
  async createImageBuffer(canvasJson: string): Promise<Buffer> {

    try {

      const canvasData = JSON.parse(canvasJson);


      const width = canvasData.width || 1920;
      const height = canvasData.height || 1080;



      const canvas = new StaticCanvas(undefined, { width, height });



      await canvas.loadFromJSON(canvasData).then(() => canvas.renderAll());

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
