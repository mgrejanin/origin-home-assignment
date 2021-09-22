import { Component, Input } from '@angular/core';

@Component({
  selector: 'saving-goals-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss'],
})
export class FeedbackCardComponent {
  @Input() monthsUntilGoal: number;
  @Input() totalAmount: number;
  @Input() goalFinalDate: string;
}
