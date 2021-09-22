import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HeaderComponent } from '../components/header/header.component';
import { FormComponent } from '../components/form/form.component';
import { ButtonComponent } from '../components/button/button.component';
import { FeedbackCardComponent } from '../components/feedback-card/feedback-card.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        FormComponent,
        ButtonComponent,
        FeedbackCardComponent,
      ],
      imports: [NgxCurrencyModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
