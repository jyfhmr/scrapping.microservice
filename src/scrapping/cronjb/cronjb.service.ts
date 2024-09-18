import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScrappingService } from '../scrapping.service';

@Injectable()
export class CronjbService {
    constructor(
        private readonly scrappingService: ScrappingService,
    ){}

    
    @Cron(CronExpression.EVERY_10_SECONDS)
    handleCron() {
           //LANZA EL SCRAPPING
           this.scrappingService.create()
    }
  }
