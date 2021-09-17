import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'saving-goals-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  savingGoalsForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.savingGoalsForm = this.formBuilder.group({
      amount: [''],
      reachDate: [''],
    });
  }
}
