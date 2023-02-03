import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodiyComponent } from './bodiy.component';

describe('BodiyComponent', () => {
  let component: BodiyComponent;
  let fixture: ComponentFixture<BodiyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodiyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
