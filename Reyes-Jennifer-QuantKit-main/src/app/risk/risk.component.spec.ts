import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RiskComponent } from './risk.component';

describe('RiskComponent', () => {
  let component: RiskComponent;
  let fixture: ComponentFixture<RiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
