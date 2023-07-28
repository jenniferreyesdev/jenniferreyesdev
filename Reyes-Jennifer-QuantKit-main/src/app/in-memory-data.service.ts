import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const pnl = [
      {
        "id": 0,
        "name": "Total PnL",
        "time": [1661456381, 1661456382, 1661456383, 1661456384, 1661456385, 1661456386, 1661456387],
        "returns": [750, 1000, 1750, 2000, 2250, 3000, 3250]
      },
      {
        "id": 1,
        "name": "Trading PnL",
        "time": [1661456381, 1661456382, 1661456383, 1661456384, 1661456385, 1661456386, 1661456387],
        "returns": [250, 500, 750, 1250, 1500, 2250, 2500]
      },
      {
        "id": 2,
        "name": "Hedging PnL",
        "time": [1661456381, 1661456382, 1661456383, 1661456384, 1661456385, 1661456386, 1661456387],
        "returns": [500, 750, 1250, 1500, 2250, 2500, 3250]
      },
      {
        "id": 3,
        "name": "Risk PnL",
        "time": [1661456381, 1661456382, 1661456383, 1661456384, 1661456385, 1661456386, 1661456387],
        "returns": [750, 1000, 1750, 2000, 2250, 3000, 3250]
      }
    ];
    return {pnl};
  }
}