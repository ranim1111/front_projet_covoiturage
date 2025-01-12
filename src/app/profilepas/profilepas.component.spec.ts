import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepasComponent } from './profilepas.component';

describe('ProfilepasComponent', () => {
  let component: ProfilepasComponent;
  let fixture: ComponentFixture<ProfilepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilepasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
