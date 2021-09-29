import { Component, Input } from '@angular/core';

@Component({
  selector: 'saving-goals-defined-goal-card',
  templateUrl: './defined-goal-card.component.html',
  styleUrls: ['./defined-goal-card.component.scss'],
})
export class DefinedGoalCardComponent {
  @Input() amount: string;
  @Input() reachDate: string | undefined;
}
