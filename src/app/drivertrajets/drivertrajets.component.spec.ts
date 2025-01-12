import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivertrajetsComponent } from './drivertrajets.component';

describe('DrivertrajetsComponent', () => {
  let component: DrivertrajetsComponent;
  let fixture: ComponentFixture<DrivertrajetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrivertrajetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrivertrajetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
