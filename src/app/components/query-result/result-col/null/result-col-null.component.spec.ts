import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultColNullComponent } from './result-col-null.component';

describe('ResultColNullComponent', () => {
  let component: ResultColNullComponent;
  let fixture: ComponentFixture<ResultColNullComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultColNullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultColNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
