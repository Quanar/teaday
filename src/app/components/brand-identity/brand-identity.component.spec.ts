import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandIdentityComponent } from './brand-identity.component';

describe('BrandIdentityComponent', () => {
  let component: BrandIdentityComponent;
  let fixture: ComponentFixture<BrandIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
