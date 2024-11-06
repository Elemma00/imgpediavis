import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultColValComponent } from './result-col-val.component';

describe('ResultColValComponent', () => {
  let component: ResultColValComponent;
  let fixture: ComponentFixture<ResultColValComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultColValComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultColValComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
