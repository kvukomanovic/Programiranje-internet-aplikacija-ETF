import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZahtevaZaKnjigomComponent } from './pregled-zahteva-za-knjigom.component';

describe('PregledZahtevaZaKnjigomComponent', () => {
  let component: PregledZahtevaZaKnjigomComponent;
  let fixture: ComponentFixture<PregledZahtevaZaKnjigomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZahtevaZaKnjigomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledZahtevaZaKnjigomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
