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
  numberOfMonths: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.setMinDate();
    this.savingGoalsForm = this.formBuilder.group({
      amount: [0],
      reachDate: [''],
    });
  }

  ngOnInit(): void {
    this.savingGoalsForm.valueChanges.subscribe(() => {
      this.setFeedbackCardData();
      this.setCanSetPreviousDate();
      this.setNumberOfMonths();
    });

    this.setFormDate(new Date(this.minDate));
  }

  setMinDate(): void {
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() + 1);
    this.minDate = minDate.toISOString().split('T')[0];
  }

  setNumberOfMonths(): void {
    const startDate = new Date();
    const finalDate = this.getFormDate();
    const yearsDiff = finalDate.getFullYear() - startDate.getFullYear();
    this.numberOfMonths =
      yearsDiff * 12 + (finalDate.getMonth() - startDate.getMonth());
  }

  setFeedbackCardData(): void {
    const formDate = this.getFormDate();
    this.reachDateMonth = formDate.toLocaleDateString('default', {
      month: 'long',
    });
    this.reachDateYear = formDate.getFullYear();
    this.finalDate = `${this.reachDateMonth} ${this.reachDateYear}`;
  }

  setCanSetPreviousDate(): void {
    if (this.minDate === undefined) {
      return;
    }

    if (new Date(this.minDate).getTime() === this.getFormDate().getTime()) {
      this.canSetPreviousMonth = false;
      return;
    }

    this.canSetPreviousMonth = true;
  }

  getFormDate(): Date {
    return new Date(this.savingGoalsForm.get('reachDate')?.value);
  }

  setGoalMonth(nextValue: 'prev' | 'next'): void {
    if (nextValue === 'prev' && !this.canSetPreviousMonth) {
      return;
    }

    const formDate = this.getFormDate();
    formDate.setMonth(
      nextValue === 'next' ? formDate.getMonth() + 1 : formDate.getMonth() - 1
    );

    this.setFormDate(formDate);
  }

  setFormDate(date: Date): void {
    this.savingGoalsForm
      .get('reachDate')
      ?.setValue(date.toISOString().split('T')[0]);
  }

  onSubmit(): void {
    if (this.savingGoalsForm.invalid) {
      return;
    }
  }
}
