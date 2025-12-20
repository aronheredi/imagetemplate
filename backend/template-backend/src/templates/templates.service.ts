import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Template } from './entities/template.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) { }

  create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const { json, ...rest } = createTemplateDto;
    const newTemplate = this.templateRepository.create({
      ...rest,
      json: JSON.stringify(json),
    });
    return this.templateRepository.save(newTemplate);
  }

  async findAll(): Promise<Template[]> {
    return this.templateRepository.find();
  }

  async findOne(name: string): Promise<Template> {
    const template = await this.templateRepository.findOne({ where: { name } });
    if (!template) {
      throw new NotFoundException(`Template with name ${name} not found`);
    }
    return template;
  }

  async update(name: string, updateTemplateDto: UpdateTemplateDto): Promise<Template> {
    const template = await this.templateRepository.findOne({ where: { name } });
    if (!template) {
      throw new NotFoundException(`Template with name ${name} not found`);
    }
    const updatedTemplate = Object.assign(template, updateTemplateDto);
    return this.templateRepository.save(updatedTemplate);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.templateRepository.delete({ id });
  }

}
