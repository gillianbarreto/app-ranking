import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScoreComponent } from './score.component';
import { FormErrorsModule, AlertModule } from '@shared';

@NgModule({
  declarations: [ScoreComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    AlertModule
  ],
  exports: [ScoreComponent],
  providers: [],
})
export class ScoreModule { }
