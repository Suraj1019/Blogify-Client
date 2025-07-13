import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewpostComponent } from './previewpost.component';

describe('PreviewpostComponent', () => {
  let component: PreviewpostComponent;
  let fixture: ComponentFixture<PreviewpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
