import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { PNL } from './pnl';

@Injectable({
  providedIn: 'root'
})

export class PnlService {

  baseURL = 'api';
  chartPNL: any;
 
  constructor(private httpClient: HttpClient) {}
 
  getAllPNL(chartID: number): Observable<ChartConfiguration<'line'>['data']>{
    return this.httpClient.get<PNL[]>(this.baseURL+"/pnl").pipe(
      map( res => {
        this.chartPNL = res[chartID];
        return {
          labels: this.chartPNL.time,
          datasets: [
            {
              data: this.chartPNL.returns,
              label: 'PnL',
              fill: true,
              tension: 0.5,
              borderColor: 'blue',
              backgroundColor: 'rgba(0,125,255,1)'
            }
          ]
        };
      }),
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
