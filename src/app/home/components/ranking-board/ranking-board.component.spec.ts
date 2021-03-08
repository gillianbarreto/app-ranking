import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RankingServiceMock } from '@mocks';
import { DataResponse, RankingService } from '@services';
import { Observable } from 'rxjs';
import { RankingBoardComponent } from './ranking-board.component';

describe('RankingBoardComponent', () => {
  let component: RankingBoardComponent;
  let fixture: ComponentFixture<RankingBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RankingBoardComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: RankingService, useClass: RankingServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRankingBoard - error', () => {
    spyOn(TestBed.get(RankingService),'getRankingBoard').and.returnValue(Observable.throwError({}));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('getRankingBoard - payload null', () => {
    spyOn(TestBed.get(RankingService),'getRankingBoard').and.returnValue(new Observable((obs) =>
      obs.next(new DataResponse(200, "Ok", null)
    )));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

});
