import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './pages/home.component';
import { FeedbackCardComponent } from './components/feedback-card/feedback-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FormComponent, HomeComponent, FeedbackCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeComponent },
    ]),
  ],
})
export class HomeModule {}
