import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaduzeneComponent } from './zaduzene.component';

describe('ZaduzeneComponent', () => {
  let component: ZaduzeneComponent;
  let fixture: ComponentFixture<ZaduzeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaduzeneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaduzeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
