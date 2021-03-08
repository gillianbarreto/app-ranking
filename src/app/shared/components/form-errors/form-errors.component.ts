import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {

  readonly errorMessages = {
    required: () => 'Este campo es obligatorio.',
    minlength: params => `El número mínimo de caracteres es ${params.requiredLength}.`,
    maxlength: params => `El número máximo de caracteres es ${params.requiredLength}.`,
    min: params => `El valor mínimo es ${params.min}.`,
    max: params => `El valor máximo es ${params.max}.`,
    pattern: () => `El formato ingresado es incorrecto.`
  };

  @Input() private control: AbstractControlDirective | AbstractControl;

  constructor() { }

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): Array<string> {
    let _errors: Array<any> = [];
    if (this.control && this.control.errors) {
      _errors = Object.keys(this.control.errors)
        .map(field => this.getMessage(field, this.control.errors[field]));
    }

    return _errors.length ? [_errors[_errors.length - 1]] : [];
  }

  trackByFn(index, item): any {
    return index;
  }

  protected getMessage(type: string, params: any): string {
    return this.errorMessages[type](params);
  }

}
