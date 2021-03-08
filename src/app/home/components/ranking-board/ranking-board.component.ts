import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Score } from '@models';
import { RankingService } from '@services';

@Component({
  selector: 'app-ranking-board',
  templateUrl: './ranking-board.component.html',
  styleUrls: ['./ranking-board.component.scss']
})
export class RankingBoardComponent implements OnInit {

  static updateView: Subject<any> = new Subject();

  public ranking: Array<Score>

  constructor(private rankingService: RankingService) {
    RankingBoardComponent.updateView.subscribe(() => {
      this.getRankingBoard();
    });
  }

  ngOnInit() {
    this.getRankingBoard();
  }

  getRankingBoard() {
    this.rankingService.getRankingBoard().subscribe(
      (response) => {
        this.ranking = response.getPayload() || [];
      },
      (error) => {
        this.ranking = [];
      }
    );
  }

}
