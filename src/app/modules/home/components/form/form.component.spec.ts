import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FeedbackCardComponent } from '../feedback-card/feedback-card.component';

import { FormComponent } from './form.component';

const minDate = new Date();
minDate.setMonth(minDate.getMonth() + 1);

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent, ButtonComponent, FeedbackCardComponent],
      imports: [ReactiveFormsModule, NgxCurrencyModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define minDate in onInit hook', () => {
    expect(component.minDate).toBe(minDate.toISOString().split('T')[0]);
  });

  it('should have a setMinDate method', () => {
    component.setMinDate();
    expect(component.minDate).toBe(minDate.toISOString().split('T')[0]);
  });

  it('should update monthsUntilGoal value when the form changes', () => {
    const spy = jest.spyOn(component, 'setMonthsUntilGoal');

    component.setGoalMonth('next');

    expect(spy).toHaveBeenCalled();
    /**
     * The number of months to the target initially will always be 1,
     * so if we change the target month to the next month, the difference should be 2 and so on.
     */
    expect(component.monthsUntilGoal).toEqual(2);
  });

  it('should update feedback card data when the form changes', () => {
    component.setGoalMonth('next');

    const formDate = component.getFormDate();
    const expectedReachDateMonth = formDate.toLocaleDateString('default', {
      month: 'long',
    });
    const expectedReachDateYear = formDate.getFullYear();
    const expectedGoalFinalDate = `${expectedReachDateMonth} ${expectedReachDateYear}`;

    const spy = jest.spyOn(component, 'setFeedbackCardData');

    component.savingGoalsForm.get('amount')?.setValue('25000');

    expect(spy).toHaveBeenCalled();
    expect(component.reachDateMonth).toBe(expectedReachDateMonth);
    expect(component.reachDateYear).toBe(expectedReachDateYear);
    expect(component.goalFinalDate).toBe(expectedGoalFinalDate);
  });

  it('should update canChoosePreviousMonth value when the form changes', () => {
    const spy = jest.spyOn(component, 'setCanChoosePreviousMonth');

    component.setGoalMonth('next');

    expect(spy).toHaveBeenCalled();
    expect(component.canChoosePreviousMonth).toBeTruthy();

    component.setGoalMonth('prev');

    expect(spy).toHaveBeenCalled();
    expect(component.canChoosePreviousMonth).toBeFalsy();
  });

  it('should call setGoalMonth by a keydown event with ArrowRight code', () => {
    const spy = jest.spyOn(component, 'setGoalMonth');
    const event = new KeyboardEvent('keydown', { code: 'ArrowRight' });

    component.setGoalMonthByKeyboardArrows(event);
    expect(spy).toHaveBeenCalledWith('next');
  });

  it('should call setGoalMonth by a keydown event with ArrowLeft code', () => {
    const spy = jest.spyOn(component, 'setGoalMonth');
    const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' });

    component.setGoalMonthByKeyboardArrows(event);
    expect(spy).toHaveBeenCalledWith('prev');
  });

  it('should have setGoalMonth method and choose the next month', () => {
    const formDate = component.getFormDate();
    formDate.setMonth(formDate.getMonth() + 1);

    const spy = jest.spyOn(component, 'setFormDate');

    component.setGoalMonth('next');

    expect(new Date(component.savingGoalsForm.get('reachDate')?.value)).toEqual(
      formDate
    );
    expect(spy).toHaveBeenCalled();
  });

  it('should have setGoalMonth method and choose the previous month', () => {
    /**
     * calling this to change canChoosePreviousMonth to true
     */
    component.setGoalMonth('next');

    const formDate = component.getFormDate();
    formDate.setMonth(formDate.getMonth() - 1);

    const spy = jest.spyOn(component, 'setFormDate');

    component.setGoalMonth('prev');

    expect(new Date(component.savingGoalsForm.get('reachDate')?.value)).toEqual(
      formDate
    );
    expect(spy).toHaveBeenCalled();
  });

  it('should not choose previous month when the canChoosePreviousMonth is false', () => {
    const formDate = component.getFormDate();
    const spy = jest.spyOn(component, 'setFormDate');

    component.setGoalMonth('prev');

    expect(new Date(component.savingGoalsForm.get('reachDate')?.value)).toEqual(
      formDate
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should have getFormDate method', () => {
    expect(component.getFormDate()).toBeInstanceOf(Date);
  });

  it('should have getFormDate method', () => {
    const expectedDate = new Date(minDate.toISOString().split('T')[0]);
    expect(component.getFormDate()).toEqual(expectedDate);
  });
});
