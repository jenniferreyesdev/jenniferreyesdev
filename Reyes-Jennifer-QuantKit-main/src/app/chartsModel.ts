import { ChartConfiguration, ChartOptions } from "chart.js";
import { PNL } from './pnl';

export class chartsModel {
    public pnlInIt: PNL = { id: 0, name: "Chart 0", time: [0, 1, 2, 3], returns: [0, 0, 0, 0] }
    public chartArr1: ChartConfiguration<'line'>['data'] = {
        labels: this.pnlInIt.time,
        datasets: [
        {
            data: this.pnlInIt.returns,
            label: 'PnL',
            fill: true,
            tension: 0.5,
            borderColor: 'blue',
            backgroundColor: 'rgba(0,125,255,1)'
        }
        ]
    };
    public chartArr2: ChartOptions<'line'> = {
        responsive: false,
        maintainAspectRatio: false
    };
    public chartArr3 = true;
    
    constructor() {
    }
}