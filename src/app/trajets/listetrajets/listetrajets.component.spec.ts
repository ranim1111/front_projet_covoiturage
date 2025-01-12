import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListetrajetsComponent } from './listetrajets.component';

describe('ListetrajetsComponent', () => {
  let component: ListetrajetsComponent;
  let fixture: ComponentFixture<ListetrajetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListetrajetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListetrajetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
