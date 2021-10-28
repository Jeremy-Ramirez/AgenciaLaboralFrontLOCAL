import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsolicitudesComponent } from './showsolicitudes.component';

describe('ShowsolicitudesComponent', () => {
  let component: ShowsolicitudesComponent;
  let fixture: ComponentFixture<ShowsolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowsolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
