import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feat2Component } from './feat2.component';

describe('Feat2Component', () => {
  let component: Feat2Component;
  let fixture: ComponentFixture<Feat2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feat2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Feat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
