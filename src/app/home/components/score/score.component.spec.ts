import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RankingServiceMock } from '@mocks';
import { RankingService } from '@services';

import { FormErrorsModule, AlertModule } from '@shared';
import { Observable } from 'rxjs';
import { ScoreComponent } from './score.component';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreComponent],
      imports: [
        RouterTestingModule,
        FormErrorsModule,
        AlertModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: RankingService, useClass: RankingServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updateScore - form invalid', () => {
    component.formScore.controls.nick.setValue('peter');
    component.formScore.controls.score.setValue('');
    const spy = spyOn(component, 'showMessage');
    component.updateScore();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('updateScore - success', () => {
    component.formScore.controls.nick.setValue('peter');
    component.formScore.controls.score.setValue('100');
    const spy = spyOn(component, 'showMessage');
    component.updateScore();
    expect(spy).toHaveBeenCalledWith('success', 'Datos actualizados correctamente');
  });

  it('updateScore - error', () => {
    component.formScore.controls.nick.setValue('peter');
    component.formScore.controls.score.setValue('100');
    spyOn(TestBed.get(RankingService),'updateScore').and.returnValue(Observable.throwError({}));
    const spy = spyOn(component, 'showMessage');
    component.updateScore();
    expect(spy).toHaveBeenCalledWith('danger', 'Error al actualizar el puntaje');
  });

  it('showMessage - alert success', () => {
    component.showMessage('success', 'Datos actualizados correctamente');
    expect(component.classAlert).toEqual('alert-success')
  });
});
