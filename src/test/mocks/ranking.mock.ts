import { Score } from '@models';
import { DataResponse } from '@services';
import { Observable } from 'rxjs';

export const playerScoreMock: Score = { nick: 'James', score: 100 };

export const rankingBoardMock: Array<Score> = [
  { nick: 'James', score: 100, rank: 1 },
  { nick: 'Billy', score: 90, rank: 2 },
  { nick: 'Peter', score: 90, rank: 2 },
  { nick: 'Alice', score: 80, rank: 3 },
];

export class RankingServiceMock {

  public getRankingBoard() {
    return new Observable((observer) => {
      observer.next(new DataResponse(
        200,
        'Success',
        rankingBoardMock
      ));
    });
  }

  public updateScore(body) {
    return new Observable((observer) => {
      observer.next(new DataResponse(
        200,
        'Success',
        {}
      ));
    });
  }

}
