import { Module } from '@nestjs/common';
import { ScrappingService } from './scrapping.service';
import { ScrappingController } from './scrapping.controller';
import { CronjbService } from './cronjb/cronjb.service';



@Module({
  controllers: [ScrappingController],
  providers: [ScrappingService, CronjbService],
})
export class ScrappingModule {}
