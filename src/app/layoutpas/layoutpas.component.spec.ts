import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutpasComponent } from './layoutpas.component';

describe('LayoutpasComponent', () => {
  let component: LayoutpasComponent;
  let fixture: ComponentFixture<LayoutpasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutpasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutpasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
