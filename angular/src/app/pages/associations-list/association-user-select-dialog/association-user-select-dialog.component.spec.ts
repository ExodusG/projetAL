import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationUserSelectDialogComponent } from './association-user-select-dialog.component';

describe('AssociationUserSelectDialogComponent', () => {
  let component: AssociationUserSelectDialogComponent;
  let fixture: ComponentFixture<AssociationUserSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationUserSelectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationUserSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
