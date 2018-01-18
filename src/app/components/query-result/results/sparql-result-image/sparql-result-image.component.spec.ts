import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlResultImageComponent } from './sparql-result-image.component';

describe('SparqlResultImageComponent', () => {
  let component: SparqlResultImageComponent;
  let fixture: ComponentFixture<SparqlResultImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparqlResultImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparqlResultImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
