import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Goal } from '../../shared/models/goal.interface';
import { GoalService } from '../../shared/service/getGoal.service';

@Component({
  selector: 'saving-goals-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  goal: BehaviorSubject<Goal> = new BehaviorSubject({} as Goal);

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.goal.next(this.goalService.getGoalBySlug(params['slug']))
    );
  }

  updateActiveGoal(goal: Goal | null): void {
    if (goal === null) {
      return;
    }

    this.goalService.updateGoalBySlug(goal);
    this.router.navigate(['/dashboard']);
  }
}
