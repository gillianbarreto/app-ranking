import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RankingService } from '@services';
import { UnsubscribeOnDestroy } from '@shared/utils';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent extends UnsubscribeOnDestroy {

  public formScore: FormGroup;
  public max = Math.pow(10, 9);
  public messageAlert: string;
  public classAlert: string;
  public showSpinner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private rankingService: RankingService
  ) {
    super();
    this.formScore = this.formBuilder.group({
      nick: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]+$/i)]],
      score: ['', [Validators.required, Validators.min(0), Validators.max(this.max)]]
    });
  }

  updateScore() {
    if (this.formScore.valid) {
      this.showSpinner = true;
      this.rankingService.updateScore(this.formScore.value).subscribe(
        () => {
          this.showMessage('success', 'Datos actualizados correctamente');
        },
        (error) => {
          console.log('*** Error ****', error);
          this.showMessage('danger', 'Error al actualizar el puntaje');
        }
      );
    }
  }

  showMessage(type, message) {
    this.formScore.reset();
    this.showSpinner = false;
    this.messageAlert = message;
    this.classAlert = `alert-${type}`;
    setTimeout(() => { this.messageAlert = ''; }, 5000);
  }

}
