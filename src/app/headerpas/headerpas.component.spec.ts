import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderpasComponent } from './headerpas.component';

describe('HeaderpasComponent', () => {
  let component: HeaderpasComponent;
  let fixture: ComponentFixture<HeaderpasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderpasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderpasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
