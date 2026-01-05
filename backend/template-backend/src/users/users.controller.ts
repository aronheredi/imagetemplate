import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import express from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  async getCurrentUser(@Req() req: express.Request) {
    return this.usersService.findOne((req as any).user.userId);
  }
}
