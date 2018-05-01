import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerToolComponent } from './designer-tool.component';

describe('DesignerToolComponent', () => {
  let component: DesignerToolComponent;
  let fixture: ComponentFixture<DesignerToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignerToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
