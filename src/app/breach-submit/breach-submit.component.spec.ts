import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreachSubmitComponent } from './breach-submit.component';

describe('BreachSubmitComponent', () => {
  let component: BreachSubmitComponent;
  let fixture: ComponentFixture<BreachSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreachSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreachSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
