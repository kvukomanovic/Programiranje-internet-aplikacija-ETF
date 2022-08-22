import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevZaKnjiguComponent } from './zahtev-za-knjigu.component';

describe('ZahtevZaKnjiguComponent', () => {
  let component: ZahtevZaKnjiguComponent;
  let fixture: ComponentFixture<ZahtevZaKnjiguComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevZaKnjiguComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZahtevZaKnjiguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
