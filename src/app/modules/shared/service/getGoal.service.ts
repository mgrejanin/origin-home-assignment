import { Injectable } from '@angular/core';
import { Goal } from '../models/goal.interface';

@Injectable()
export class GoalService {
  goals: Goal[];

  constructor() {
    if (!window.localStorage.getItem('goals')) {
      const goals: Goal[] = [
        {
          icon: '/assets/college-icon.svg',
          slug: 'college',
          name: 'Go to college',
        },
        {
          icon: '/assets/vacation-icon.svg',
          slug: 'vacation',
          name: 'Take a vacation',
        },
        {
          icon: '/assets/car-icon.svg',
          slug: 'car',
          name: 'Buy a car',
        },
        {
          icon: '/assets/wedding-party-icon.svg',
          slug: 'wedding',
          name: 'Throw a wedding party',
        },
        {
          icon: '/assets/emergency-fund-icon.svg',
          slug: 'emergency-fund',
          name: 'Build an emergency fund',
        },
        {
          icon: '/assets/baby-icon.svg',
          slug: 'have-a-baby',
          name: 'Have a baby',
        },
      ];
      window.localStorage.setItem('goals', JSON.stringify(goals));
      return;
    }

    this.goals = JSON.parse(window.localStorage.getItem('goals') || '');
  }

  getGoalBySlug(slug: string): Goal {
    return this.goals.find((goal) => goal.slug === slug) || ({} as Goal);
  }

  updateGoalBySlug(goal: Goal): void {
    const activeGoal = this.goals.findIndex(
      (goalItem) => goalItem.slug === goal.slug
    );

    this.goals[activeGoal] = goal;

    this.persistGoals();
  }

  persistGoals(): void {
    window.localStorage.setItem('goals', JSON.stringify(this.goals));
  }
}
