import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { ScoreModule } from '@home/score/score.module';
import { RankingBoardModule } from '@home/ranking-board/ranking-board.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ScoreModule,
    RankingBoardModule
  ],
  exports: [],
  providers: [],
})
export class HomeModule { }
