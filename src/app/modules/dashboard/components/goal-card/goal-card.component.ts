import { Component, Input } from '@angular/core';
import { Goal } from 'src/app/modules/shared/models/goal.interface';

@Component({
  selector: 'saving-goals-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss'],
})
export class GoalCardComponent {
  @Input() goal: Goal;
}
