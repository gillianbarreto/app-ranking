import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RankingService } from './ranking.service';

import { DataResponse } from './shared';
import { environment } from '@environment';
import { rankingBoardMock, playerScoreMock } from '@mocks';

describe('RankingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RankingService = TestBed.get(RankingService);
    expect(service).toBeTruthy();
  });

  it('getRankingBoard() - Obtener Tabla de Clasificados',
    inject(
      [HttpTestingController, RankingService],
      (httpMock: HttpTestingController, RankingService: RankingService) => {
        const mockResponse = new DataResponse(200, 'Success', rankingBoardMock);
        RankingService.getRankingBoard().subscribe((response) => {
          expect(response.getCode()).toBe(200);
        });
        const url = `${environment.MS_URL}${environment.MS_BASE}${environment.RANKING_BOARD}`;
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        expect(req.request.responseType).toEqual('json');
        req.flush(mockResponse);
        httpMock.verify();
      }
    )
  );

  it('updateScore() - Actualizar puntuación del jugador',
    inject(
      [HttpTestingController, RankingService],
      (httpMock: HttpTestingController, RankingService: RankingService) => {
        const mockResponse = new DataResponse(200, 'Success', rankingBoardMock);
        RankingService.updateScore(playerScoreMock).subscribe((response) => {
          expect(response.getCode()).toBe(200);
        });
        const url = `${environment.MS_URL}${environment.MS_BASE}${environment.SCORE}`;
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        expect(req.request.responseType).toEqual('json');
        req.flush(mockResponse);
        httpMock.verify();
      }
    )
  );

});
