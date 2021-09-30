import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Goal } from '../models/goal.interface';
import { GoalStoreStore, GoalStoreState } from './goal-store.store';

@Injectable({ providedIn: 'root' })
export class GoalStoreQuery extends QueryEntity<GoalStoreState> {
  readonly goals: Goal[];
  readonly goals$: Observable<Goal[]>;
  readonly activeGoal$: Observable<Goal | undefined>;

  constructor(protected store: GoalStoreStore) {
    super(store);
    this.goals$ = this.selectAll();
    this.activeGoal$ = this.selectActive();
    this.goals = this.getAll();
  }
}
