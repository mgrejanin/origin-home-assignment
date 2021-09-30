import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../../shared/models/goal.interface';
import { GoalStoreQuery } from '../../shared/state/goal-store.query';
import { GoalStoreService } from '../../shared/state/goal-store.service';

@Component({
  selector: 'saving-goals-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  goals$: Observable<Goal[]>;

  constructor(
    private goalStoreService: GoalStoreService,
    private goalQuery: GoalStoreQuery
  ) {
    this.goals$ = this.goalQuery.goals$;
  }

  ngOnInit(): void {
    this.goalStoreService.getGoalsList();
  }
}
