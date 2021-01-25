import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestEditionDashboardComponent } from './contest-edition-dashboard.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HeaderComponent} from '../../header/header.component';

describe('ContestEditionDashboardComponent', () => {
  let component: ContestEditionDashboardComponent;
  let fixture: ComponentFixture<ContestEditionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ContestEditionDashboardComponent, HeaderComponent ]
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
