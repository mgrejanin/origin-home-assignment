import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Goal } from '../../shared/models/goal.interface';
import { GoalStoreQuery } from '../../shared/state/goal-store.query';
import { GoalStoreService } from '../../shared/state/goal-store.service';

@Component({
  selector: 'saving-goals-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeGoal$: Observable<Goal | undefined>;

  constructor(
    private goalStateService: GoalStoreService,
    private goalStateQuery: GoalStoreQuery,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.activeGoal$ = this.goalStateQuery.activeGoal$;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.goalStateService.setActiveGoal(params['slug'])
    );
  }

  updateActiveGoal(goal: Goal | null): void {
    if (goal === null) {
      return;
    }

    this.goalStateService.updateActiveGoal(goal);
    this.router.navigate(['/dashboard']);
  }
}
