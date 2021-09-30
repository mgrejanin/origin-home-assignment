import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Goal } from '../models/goal.interface';

export interface GoalStoreState extends EntityState<Goal, string>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'goalsStore', idKey: 'slug' })
export class GoalStoreStore extends EntityStore<GoalStoreState> {
  constructor() {
    super();
  }
}
