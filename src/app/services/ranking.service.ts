import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment';
import { BffClientService, DataResponse } from './shared';
import { Score } from '@models';

@Injectable({
  providedIn: 'root'
})
export class RankingService extends BffClientService {

  constructor(
    protected http: HttpClient,
    private ngZone: NgZone
  ) {
    super(http);
  }

  public getRankingBoard(): Observable<DataResponse> {
    const url = `${this.urlBase}${environment.RANKING_BOARD}`;
    return this.http.get(url, { headers: this.getHeaders(), observe: 'response' })
      .map(this.okData)
      .catch(this.errorData)
      .finally(() => { });
  }

  // Lista de Datos por eventos
  public getRankingBoardEvent(): Observable<any> {
    const url = `${this.urlBase}${environment.RANKING_BOARD_EVENT}`;
    return new Observable<any>(obs => {
      const eventSource = this.getEventSource(url);

      eventSource.onmessage = event => {
        const data = JSON.parse(event.data);
        this.ngZone.run(() => obs.next(data));
      };

      eventSource.onerror = error => {
        obs.error(error);
      };

      return () => eventSource.close();
    });

  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  public updateScore(body: Score): Observable<DataResponse> {
    const url = `${this.urlBase}${environment.SCORE}`;
    return this.http.post(url, body, { headers: this.getHeaders(), observe: 'response' })
      .map(this.okData)
      .catch(this.errorData)
      .finally(() => { });
  }

}
