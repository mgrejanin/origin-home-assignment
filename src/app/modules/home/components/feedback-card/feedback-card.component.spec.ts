import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCardComponent } from './feedback-card.component';
import { CurrencyPipe } from '@angular/common';

describe('FeedbackCardComponent', () => {
  let component: FeedbackCardComponent;
  let fixture: ComponentFixture<FeedbackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackCardComponent],
      providers: [CurrencyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the passed @Input goalFinalDate value', () => {
    component.goalFinalDate = 'December 2021';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('.feedback-card__goal-final-date').innerHTML
    ).toContain(`December 2021`);
  });

  it('should correctly render the passed @Input monthsUntilGoal value', () => {
    component.monthsUntilGoal = 12;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('.feedback-card__months-until-goal').innerHTML
    ).toContain('12');
  });

  it('should correctly render the passed @Input totalAmount value', () => {
    const currencyPipe = new CurrencyPipe('en-US');
    component.totalAmount = 25000;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('.feedback-card__total-amount').innerHTML
    ).toContain(currencyPipe.transform(25000));
  });

  it('should correctly render monthly amount value', () => {
    const currencyPipe = new CurrencyPipe('en-US');
    component.totalAmount = 25000;
    component.monthsUntilGoal = 2;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('.feedback-card__monthly-amount-value').innerHTML
    ).toContain(
      currencyPipe.transform(component.totalAmount / component.monthsUntilGoal)
    );
  });
});
