import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScrappingService } from './scrapping.service';
import { CreateScrappingDto } from './dto/create-scrapping.dto';


@Controller('scrapping')
export class ScrappingController {
  constructor(private readonly scrappingService: ScrappingService) {}

  @Post()
  create(@Body() createScrappingDto: CreateScrappingDto) {
    return this.scrappingService.create();
  }

  @Get("/healthtest")
  test() {
    return this.scrappingService.test();
  }


}
