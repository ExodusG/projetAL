import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationCreateComponent } from './association-create.component';

describe('AssociationCreateComponent', () => {
  let component: AssociationCreateComponent;
  let fixture: ComponentFixture<AssociationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
