import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/modules/shared/models/goal.interface';
import { GoalStoreService } from 'src/app/modules/shared/state/goal-store.service';

@Component({
  selector: 'saving-goals-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss'],
})
export class GoalCardComponent {
  @Input() goal: Goal;

  constructor(
    private goalStoreService: GoalStoreService,
    private router: Router
  ) {}

  editGoal(): void {
    this.goalStoreService.setActiveGoal(this.goal.slug);
    this.router.navigate([`/form/${this.goal.slug}`]);
  }
}
