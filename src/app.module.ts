import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { PublicPanelModule } from './public/public.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    AdminPanelModule,
    PublicPanelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
