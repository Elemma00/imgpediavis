import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlResultComponent } from './sparql-result.component';

describe('SparqlResultComponent', () => {
  let component: SparqlResultComponent;
  let fixture: ComponentFixture<SparqlResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparqlResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparqlResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
