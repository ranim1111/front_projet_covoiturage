import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarpasComponent } from './sidebarpas.component';

describe('SidebarpasComponent', () => {
  let component: SidebarpasComponent;
  let fixture: ComponentFixture<SidebarpasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarpasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarpasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
