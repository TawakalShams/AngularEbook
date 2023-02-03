import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTeacherToClassComponent } from './assign-teacher-to-class.component';

describe('AssignTeacherToClassComponent', () => {
  let component: AssignTeacherToClassComponent;
  let fixture: ComponentFixture<AssignTeacherToClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTeacherToClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTeacherToClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
