import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstorijaComponent } from './istorija.component';

describe('IstorijaComponent', () => {
  let component: IstorijaComponent;
  let fixture: ComponentFixture<IstorijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstorijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IstorijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
