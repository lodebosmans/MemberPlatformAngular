import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MymembersComponent } from './mymembers.component';

describe('MymembersComponent', () => {
  let component: MymembersComponent;
  let fixture: ComponentFixture<MymembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MymembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MymembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
