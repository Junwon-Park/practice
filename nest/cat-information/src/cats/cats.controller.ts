import { CatsService } from './cats.service';
import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return 'All cats';
  }

  @Get(':id')
  getOneCat() {
    return 'One cat';
  }

  @Post()
  createCat() {
    return 'Create cat';
  }

  @Put(':id')
  updateCat() {
    return 'Update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'Update partial cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'Delete service';
  }
}
