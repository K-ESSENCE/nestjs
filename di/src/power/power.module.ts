import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService], //프라이빗이 기본
  exports: [PowerService], // 프라이빗을 변경
})
export class PowerModule {}
