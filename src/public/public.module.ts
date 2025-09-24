// src/public-panel/public-panel.module.ts
import { Module } from '@nestjs/common';
import { PublicPanelController } from './public.controller';
import { PublicPanelService } from './public.service';
@Module({
  controllers: [PublicPanelController],
  providers: [PublicPanelService],
})
export class PublicPanelModule {}
