import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvolvementRoleFormComponent } from './involvement-role-form.component';

describe('InvolvementRoleFormComponent', () => {
  let component: InvolvementRoleFormComponent;
  let fixture: ComponentFixture<InvolvementRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvolvementRoleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvolvementRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
