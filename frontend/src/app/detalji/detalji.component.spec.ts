import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiComponent } from './detalji.component';

describe('DetaljiComponent', () => {
  let component: DetaljiComponent;
  let fixture: ComponentFixture<DetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
