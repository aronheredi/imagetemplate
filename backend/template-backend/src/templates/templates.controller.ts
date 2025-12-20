import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) { }

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @Get()
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.templatesService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templatesService.update(name, updateTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templatesService.remove(id);
  }
}
