import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOverComponent } from './list-over.component';

describe('ListOverComponent', () => {
  let component: ListOverComponent;
  let fixture: ComponentFixture<ListOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
