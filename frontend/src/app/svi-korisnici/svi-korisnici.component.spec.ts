import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviKorisniciComponent } from './svi-korisnici.component';

describe('SviKorisniciComponent', () => {
  let component: SviKorisniciComponent;
  let fixture: ComponentFixture<SviKorisniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SviKorisniciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SviKorisniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
