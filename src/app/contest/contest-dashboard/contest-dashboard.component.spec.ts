import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestDashboardComponent } from './contest-dashboard.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HeaderComponent} from '../../header/header.component';

describe('ContestDashboardComponent', () => {
  let component: ContestDashboardComponent;
  let fixture: ComponentFixture<ContestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ContestDashboardComponent, HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
