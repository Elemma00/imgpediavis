import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlResultUrlComponent } from './sparql-result-url.component';

describe('SparqlResultUrlComponent', () => {
  let component: SparqlResultUrlComponent;
  let fixture: ComponentFixture<SparqlResultUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparqlResultUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparqlResultUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
