import { Component } from '@angular/core';
import { Goal } from '../../shared/models/goal.interface';
import { GoalService } from '../../shared/service/getGoal.service';

@Component({
  selector: 'saving-goals-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  goals: Goal[];

  constructor(private goalService: GoalService) {
    this.goals = this.goalService.goals;
  }
}
