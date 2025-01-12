import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageuserslistComponent } from './manageuserslist.component';

describe('ManageuserslistComponent', () => {
  let component: ManageuserslistComponent;
  let fixture: ComponentFixture<ManageuserslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageuserslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageuserslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
