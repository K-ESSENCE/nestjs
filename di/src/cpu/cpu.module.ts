import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  imports: [PowerModule], // CPU와 파워 연결
  exports: [CpuService],
  providers: [CpuService],
})
export class CpuModule {}
