import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarconducteurComponent } from './sidebarconducteur.component';

describe('SidebarconducteurComponent', () => {
  let component: SidebarconducteurComponent;
  let fixture: ComponentFixture<SidebarconducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarconducteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarconducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
