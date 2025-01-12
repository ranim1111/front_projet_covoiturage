import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileconducteurComponent } from './profileconducteur.component';

describe('ProfileconducteurComponent', () => {
  let component: ProfileconducteurComponent;
  let fixture: ComponentFixture<ProfileconducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileconducteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileconducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
