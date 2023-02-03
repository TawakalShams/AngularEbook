import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsettingsComponent } from './rightsettings.component';

describe('RightsettingsComponent', () => {
  let component: RightsettingsComponent;
  let fixture: ComponentFixture<RightsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
