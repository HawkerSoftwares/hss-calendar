import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HssCalendar } from './hss-calendar';

describe('HssCalendar', () => {
  let component: HssCalendar;
  let fixture: ComponentFixture<HssCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HssCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HssCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
