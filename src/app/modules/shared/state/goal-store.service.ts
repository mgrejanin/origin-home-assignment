import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { goalsMock } from '../mocks/goals.mock';
import { Goal } from '../models/goal.interface';
import { GoalStoreQuery } from './goal-store.query';
import { GoalStoreStore } from './goal-store.store';

@Injectable({ providedIn: 'root' })
export class GoalStoreService {
  constructor(
    protected store: GoalStoreStore,
    private goalsStoreQuery: GoalStoreQuery
  ) {}

  getGoalsList(): void {
    if (this.goalsStoreQuery.goals.length) {
      return;
    }

    /**
     * ************************************************************
     * Setting mock goals
     */

    window.localStorage.setItem(
      environment.localStorageIndex,
      JSON.stringify(goalsMock)
    );

    /**
     * ***************************************************************
     */

    this.store.set(
      JSON.parse(
        window.localStorage.getItem(environment.localStorageIndex) || ''
      )
    );
  }

  setActiveGoal(slug: string): void {
    this.store.setActive(slug);
  }

  updateActiveGoal(goal: Goal): void {
    this.store.updateActive({ ...goal });
  }
}
