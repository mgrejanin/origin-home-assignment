import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DefinedGoalCardComponent } from './components/defined-goal-card/defined-goal-card.component';
import { GoalCardComponent } from './components/goal-card/goal-card.component';
import { DashboardComponent } from './pages/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GoalCardComponent,
    DefinedGoalCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardComponent },
    ]),
  ],
})
export class DashboardModule {}
