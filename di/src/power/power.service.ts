import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(watts: number) {
    //전력량
    console.log(`Supplying ${watts} worth of power`);
  }
}
