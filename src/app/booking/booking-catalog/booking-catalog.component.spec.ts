import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCatalogComponent } from './booking-catalog.component';

describe('BookingCatalogComponent', () => {
  let component: BookingCatalogComponent;
  let fixture: ComponentFixture<BookingCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
