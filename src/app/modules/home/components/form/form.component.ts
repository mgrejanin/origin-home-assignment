import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'saving-goals-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  savingGoalsForm: FormGroup;
  minDate: string;
  reachDateMonth: string;
  reachDateYear: number;
  canSetPreviousMonth: boolean = false;
  finalDate: string;
  numberOfMonths: number;

  constructor(private formBuilder: FormBuilder) {
    this.savingGoalsForm = this.formBuilder.group({
      amount: [0],
      reachDate: [''],
    });
  }

  ngOnInit() {
    this.savingGoalsForm.valueChanges.subscribe(() => {
      this.setFeedbackDate();
      this.setCanSetPreviousDate();
      this.setNumberOfMonths();
    });
    this.setFormDate(new Date());
    this.minDate = this.getFormDate().toISOString().split('T')[0];
  }

  setNumberOfMonths() {
    const startDate = new Date(this.minDate);
    const finalDate = this.getFormDate();
    const yearsDiff = finalDate.getFullYear() - startDate.getFullYear();
    this.numberOfMonths =
      yearsDiff * 12 + (finalDate.getMonth() - startDate.getMonth());
  }

  private setFeedbackDate() {
    const formDate = this.getFormDate();
    this.reachDateMonth = formDate.toLocaleDateString('default', {
      month: 'long',
    });
    this.reachDateYear = formDate.getFullYear();
    this.finalDate = `${this.reachDateMonth} ${this.reachDateYear}`;
  }

  private setCanSetPreviousDate() {
    if (this.minDate === undefined) {
      return;
    }

    if (new Date(this.minDate).getTime() === this.getFormDate().getTime()) {
      this.canSetPreviousMonth = false;
      return;
    }

    this.canSetPreviousMonth = true;
  }

  getFormDate() {
    return new Date(this.savingGoalsForm.get('reachDate')?.value);
  }

  setPreviousMonth() {
    if (!this.canSetPreviousMonth) {
      return;
    }

    const formDate = this.getFormDate();
    formDate.setMonth(formDate.getMonth() - 1);
    this.setFormDate(formDate);
  }

  setNextMonth() {
    const formDate = this.getFormDate();
    formDate.setMonth(formDate.getMonth() + 1);
    this.setFormDate(formDate);
  }

  setFormDate(date: Date) {
    this.savingGoalsForm
      .get('reachDate')
      ?.setValue(date.toISOString().split('T')[0]);
  }
}
