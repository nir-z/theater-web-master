import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDashboardComponent } from './movies-dashboard.component';

describe('MoviesDashboardComponent', () => {
  let component: MoviesDashboardComponent;
  let fixture: ComponentFixture<MoviesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
