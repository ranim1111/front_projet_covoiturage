import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbapassagerComponent } from './navbapassager.component';

describe('NavbapassagerComponent', () => {
  let component: NavbapassagerComponent;
  let fixture: ComponentFixture<NavbapassagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbapassagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbapassagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
