import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultColImageComponent } from './result-col-image.component';

describe('ResultColImageComponent', () => {
  let component: ResultColImageComponent;
  let fixture: ComponentFixture<ResultColImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultColImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultColImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
