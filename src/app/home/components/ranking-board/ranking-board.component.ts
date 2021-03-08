import { Component, OnInit } from '@angular/core';
import { Score } from '@models';
import { RankingService } from '@services';

@Component({
  selector: 'app-ranking-board',
  templateUrl: './ranking-board.component.html',
  styleUrls: ['./ranking-board.component.scss']
})
export class RankingBoardComponent implements OnInit {

  public ranking: Array<Score>

  constructor(private rankingService: RankingService) { }

  ngOnInit() {
    this.rankingService.getRankingBoard().subscribe(
      (response) => {
        this.ranking = response.getPayload() || [];
      },
      (error) => {
        console.log('*** Error ****', error);
      }
    );
  }

}
