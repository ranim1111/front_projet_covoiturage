import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutconducteurComponent } from './layoutconducteur.component';

describe('LayoutconducteurComponent', () => {
  let component: LayoutconducteurComponent;
  let fixture: ComponentFixture<LayoutconducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutconducteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutconducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
