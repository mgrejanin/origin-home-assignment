import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinedGoalCardComponent } from './defined-goal-card.component';

describe('DefinedGoalCardComponent', () => {
  let component: DefinedGoalCardComponent;
  let fixture: ComponentFixture<DefinedGoalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefinedGoalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinedGoalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
