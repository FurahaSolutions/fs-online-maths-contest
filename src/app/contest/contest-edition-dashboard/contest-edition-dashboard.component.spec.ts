import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestEditionDashboardComponent } from './contest-edition-dashboard.component';

describe('ContestEditionDashboardComponent', () => {
  let component: ContestEditionDashboardComponent;
  let fixture: ComponentFixture<ContestEditionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestEditionDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestEditionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
