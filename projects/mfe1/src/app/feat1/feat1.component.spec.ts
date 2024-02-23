import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feat1Component } from './feat1.component';

describe('Feat1Component', () => {
  let component: Feat1Component;
  let fixture: ComponentFixture<Feat1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feat1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Feat1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
