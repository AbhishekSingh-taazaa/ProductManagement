import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsycListComponent } from './asyc-list.component';

describe('AsycListComponent', () => {
  let component: AsycListComponent;
  let fixture: ComponentFixture<AsycListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsycListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsycListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
