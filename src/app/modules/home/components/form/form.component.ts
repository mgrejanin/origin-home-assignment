import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Goal } from 'src/app/modules/shared/models/goal.interface';

@Component({
  selector: 'saving-goals-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() goal: Goal;
  @Output() updateGoal: EventEmitter<Goal> = new EventEmitter<Goal>();

  savingGoalsForm: FormGroup;
  minDate: string;
  reachDateMonth: string;
  reachDateYear: number;
  canChoosePreviousMonth: boolean = false;
  goalFinalDate: string;
  monthsUntilGoal: number = 0;

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
      this.setCanChoosePreviousMonth();
      this.setMonthsUntilGoal();
    });

    if (this.goal.amount) {
      this.updateFormValue();
      return;
    }

    this.setFormDate(new Date(this.minDate));
  }

  updateFormValue(): void {
    this.savingGoalsForm.setValue({
      amount: this.goal.amount,
      reachDate: this.goal.reachDate,
    });
  }

  setMinDate(): void {
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() + 1);
    this.minDate = minDate.toISOString().split('T')[0];
  }

  setMonthsUntilGoal(): void {
    const startDate = new Date();
    const finalDate = this.getFormDate();
    const yearsDiff = finalDate.getFullYear() - startDate.getFullYear();
    this.monthsUntilGoal =
      yearsDiff * 12 + (finalDate.getMonth() - startDate.getMonth());
  }

  setFeedbackCardData(): void {
    const formDate = this.getFormDate();
    this.reachDateMonth = formDate.toLocaleDateString('default', {
      month: 'long',
    });
    this.reachDateYear = formDate.getFullYear();
    this.goalFinalDate = `${this.reachDateMonth} ${this.reachDateYear}`;
  }

  setCanChoosePreviousMonth(): void {
    if (new Date(this.minDate).getTime() === this.getFormDate().getTime()) {
      this.canChoosePreviousMonth = false;
      return;
    }

    this.canChoosePreviousMonth = true;
  }

  getFormDate(): Date {
    return new Date(this.savingGoalsForm.get('reachDate')?.value);
  }

  setGoalMonthByKeyboardArrows(event: KeyboardEvent): void {
    if (event.code === 'ArrowRight') {
      this.setGoalMonth('next');
      return;
    }

    if (event.code === 'ArrowLeft') {
      this.setGoalMonth('prev');
      return;
    }
  }

  setGoalMonth(nextValue: 'prev' | 'next'): void {
    if (nextValue === 'prev' && !this.canChoosePreviousMonth) {
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
    this.goal = {
      ...this.goal,
      ...this.savingGoalsForm.value,
    };

    this.updateGoal.emit(this.goal);
  }
}
