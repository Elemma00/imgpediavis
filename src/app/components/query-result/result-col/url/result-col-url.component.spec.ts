import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultColUrlComponent } from './result-col-url.component';

describe('ResultColUrlComponent', () => {
  let component: ResultColUrlComponent;
  let fixture: ComponentFixture<ResultColUrlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultColUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultColUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
