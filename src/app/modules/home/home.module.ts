import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    FormComponent,
    HomeComponent,
    HeaderComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeComponent },
    ]),
  ],
})
export class HomeModule {}
