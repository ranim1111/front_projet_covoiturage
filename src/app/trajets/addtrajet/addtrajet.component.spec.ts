import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtrajetComponent } from './addtrajet.component';

describe('AddtrajetComponent', () => {
  let component: AddtrajetComponent;
  let fixture: ComponentFixture<AddtrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtrajetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddtrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
