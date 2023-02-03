import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomerOrdersComponent } from './my-customer-orders.component';

describe('MyCustomerOrdersComponent', () => {
  let component: MyCustomerOrdersComponent;
  let fixture: ComponentFixture<MyCustomerOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCustomerOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCustomerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
