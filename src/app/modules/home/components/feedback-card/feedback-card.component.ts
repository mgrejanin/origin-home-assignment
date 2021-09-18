import { Component, Input } from '@angular/core';

@Component({
  selector: 'saving-goals-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss'],
})
export class FeedbackCardComponent {
  @Input() monthlyAmount: number;
  @Input() numberOfMonths: number;
  @Input() totalAmount: string;
  @Input() finalDate: string;
}
