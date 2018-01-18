import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlResultValComponent } from './sparql-result-val.component';

describe('SparqlResultValComponent', () => {
  let component: SparqlResultValComponent;
  let fixture: ComponentFixture<SparqlResultValComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparqlResultValComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparqlResultValComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
