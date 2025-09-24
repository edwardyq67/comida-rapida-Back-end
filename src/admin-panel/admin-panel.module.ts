import { Module } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { AdminPanelController } from './admin-panel.controller';
import { AuthModule } from '../auth/auth.module'; // 👈 importa AuthModule que ya tiene JwtService

@Module({
  imports: [AuthModule],
  controllers: [AdminPanelController],
  providers: [AdminPanelService],
})
export class AdminPanelModule {}
