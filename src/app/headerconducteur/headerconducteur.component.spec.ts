import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderconducteurComponent } from './headerconducteur.component';

describe('HeaderconducteurComponent', () => {
  let component: HeaderconducteurComponent;
  let fixture: ComponentFixture<HeaderconducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderconducteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderconducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
