import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactsComponent } from './artifacts.component';

describe('ArtifactComponent', () => {
  let component: ArtifactsComponent;
  let fixture: ComponentFixture<ArtifactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
