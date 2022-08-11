import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocetnaKorisnikComponent } from './pocetna-korisnik.component';

describe('PocetnaKorisnikComponent', () => {
  let component: PocetnaKorisnikComponent;
  let fixture: ComponentFixture<PocetnaKorisnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocetnaKorisnikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PocetnaKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
